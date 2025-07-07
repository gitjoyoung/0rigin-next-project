/*
 * Next.js 15 · App Router
 * Global Middleware (Edge) – Visitor tracking + Auth gate
 * -------------------------------------------------------
 * 1. 세션(Cookie) ↔ Supabase `updateSession()` 동기화
 * 2. 로그인 단계 판정
 *    - unauth         : 비회원 – 보호 페이지 차단
 *    - needsProfile   : 프로필 미완 – 계속 차단 (원한다면 /signup redirect)
 *    - authed         : 완전 로그인 – 모든 경로 허용
 * 3. 활동 로그 저장 (visitors 테이블)
 *    - 비회원 : nanoid() 로 임시 visitor_id 생성 후 쿠키 저장(24h)
 *    - 회원   : user.id 그대로 visitor_id 사용
 * 4. viewport(mobile/tablet/desktop) → query 파라미터로 주입 (클라 참고용)
 * -------------------------------------------------------
 */
import {
   ROUTE_LOGIN,
   ROUTE_MY_PAGE,
   ROUTE_RESET_PASSWORD,
   ROUTE_SIGN,
} from '@/constants/pathname'
import { SupabaseServerClient } from '@/shared/lib/supabase/supabase-server-client'
import { updateSession } from '@/shared/lib/supabase/supabase-session'
import { nanoid } from 'nanoid'
import { NextRequest, NextResponse, userAgent } from 'next/server'
import { match } from 'path-to-regexp'

/* ──────────────────────────────────────────────────────────
 * 0. Config
 * ----------------------------------------------------------------*/
const PROTECTED = [ROUTE_MY_PAGE]
const AUTH_FORBIDDEN = [ROUTE_LOGIN, ROUTE_SIGN, ROUTE_RESET_PASSWORD]
const matchProtected = (pathname: string) =>
   PROTECTED.some((p) => match(p)(pathname))

/* ──────────────────────────────────────────────────────────
 * 1. Viewport helper
 * ----------------------------------------------------------------*/
function getViewport(req: NextRequest): 'mobile' | 'tablet' | 'desktop' {
   const { device } = userAgent(req)
   if (device.type === 'mobile') return 'mobile'
   if (device.type === 'tablet') return 'tablet'
   return 'desktop'
}

/* ──────────────────────────────────────────────────────────
 * 2. Visitor logging
 * ----------------------------------------------------------------*/
async function logVisit(
   req: NextRequest,
   supabase: Awaited<ReturnType<typeof SupabaseServerClient>>,
) {
   const cookies = req.cookies
   const visitorId = cookies.get('visitor_id')?.value ?? nanoid()

   const { browser, device } = userAgent(req)
   const data = {
      visitor_id: visitorId,
      ip_address: req.headers.get('x-forwarded-for') ?? 'unknown',
      device_type: getViewport(req),
      browser: browser.name,
      language: req.headers.get('accept-language')?.split(',')[0] ?? 'unknown',
      referrer: req.headers.get('referer') ?? 'direct',
      page_url: req.nextUrl.pathname,
      os: device.type ?? 'unknown',
   }

   try {
      await supabase.from('visitors').insert(data).select('id').single()
   } catch (error) {}

   // 로그 추가
   console.log(
      '[MIDDLEWARE] visitorId:',
      visitorId,
      'isFirst:',
      !cookies.get('visitor_id'),
      'cookies:',
      cookies.getAll(),
   )

   return { visitorId, isFirst: !cookies.get('visitor_id') }
}

/* ──────────────────────────────────────────────────────────
 * 3. Auth gate logic
 * ----------------------------------------------------------------*/
async function authGate(req: NextRequest) {
   // 3‑1 Sync cookies ↔ session
   const { supabaseResponse, user, supabase } = await updateSession(req)

   // 3‑2 Visit log (do not await)
   const { visitorId, isFirst } = await logVisit(req, supabase)
   if (isFirst) {
      supabaseResponse.cookies.set('visitor_id', visitorId, {
         httpOnly: true,
         maxAge: 60 * 60 * 24,
         path: '/',
         sameSite: 'lax',
      })
   }

   // /* ─── 회원 X ─────────────────────── */
   // if (!user) {
   //    if (matchProtected(req.nextUrl.pathname)) {
   //       return NextResponse.redirect(new URL(ROUTE_LOGIN, req.url))
   //    }
   //    const url = new URL(req.url)
   //    url.searchParams.set('viewport', getViewport(req))
   //    return NextResponse.rewrite(url)
   // }

   return NextResponse.next()
}

/* ──────────────────────────────────────────────────────────
 * 4. Middleware entry
 * ----------------------------------------------------------------*/
export async function middleware(req: NextRequest) {
   return NextResponse.next()
}

export const config = {
   matcher: [
      '/((?!_next/static|_next/image|favicon.ico|api|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
   ],
}
