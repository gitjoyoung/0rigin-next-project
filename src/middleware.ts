/**
 * middleware.ts
 * ---------------------------------------------------------------
 * Next.js 15 · App Router · Edge Middleware
 * 1) Supabase 세션 ↔ 쿠키 동기화
 * 2) 로그인 상태 판정·보호 페이지 가드
 * 3) 방문자(Log) 기록  — visitors 테이블
 *    · 비회원 : nanoid() 로 임시 visitor_id 생성 → 24 h 쿠키
 *    · 회원   : user.id 를 visitor_id 로 사용
 * 4) viewport(mobile / tablet / desktop) 파라미터 주입
 * ---------------------------------------------------------------
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

/* ──────────────────────────────
 * 0. 보호·차단 경로 매처
 * ──────────────────────────────*/
const PROTECTED = [ROUTE_MY_PAGE]
const AUTH_FORBIDDEN = [ROUTE_LOGIN, ROUTE_SIGN, ROUTE_RESET_PASSWORD]
const matchProtected = (pathname: string) =>
   PROTECTED.some((p) => match(p)(pathname))

/* ──────────────────────────────
 * 1. Viewport Helper
 * ──────────────────────────────*/
function getViewport(req: NextRequest): 'mobile' | 'tablet' | 'desktop' {
   const { device } = userAgent(req)
   if (device.type === 'mobile') return 'mobile'
   if (device.type === 'tablet') return 'tablet'
   return 'desktop'
}

/* ──────────────────────────────
 * 2. 방문자 로그 기록
 * ──────────────────────────────*/
async function logVisit(
   req: NextRequest,
   supabase: Awaited<ReturnType<typeof SupabaseServerClient>>,
) {
   // 1. 응답에 이미 쿠키가 있는지 확인 (최우선)
   let visitorId = req.cookies.get('visitor_id')?.value
   let isFirst = false

   if (!visitorId) {
      visitorId = nanoid()
      isFirst = true
   }

   const { browser, device, os } = userAgent(req)

   await supabase.from('visitors').insert({
      visitor_id: visitorId,
      page_url: req.nextUrl.pathname,
      ip_address: req.headers.get('x-forwarded-for') ?? null,
      device_type: device.type ?? null,
      browser: browser.name ?? null,
      os: os.name ?? null,
      language: req.headers.get('accept-language')?.split(',')[0] ?? null,
      referrer: req.headers.get('referer') ?? null,
   })

   return { visitorId, isFirst }
}

/* ──────────────────────────────
 * 3. Auth Gate
 * ──────────────────────────────*/
async function authGate(req: NextRequest) {
   // 3-1  Supabase 세션 ↔ 쿠키 동기화
   const { supabase, supabaseResponse, user } = await updateSession(req)

   // 3-2  방문자 로그 (비동기)
   const { visitorId, isFirst } = await logVisit(req, supabase)

   // 3-3  visitor_id 쿠키가 없다면 심어 주기
   if (isFirst) {
      supabaseResponse.cookies.set({
         name: 'visitor_id',
         value: visitorId,
         httpOnly: true,
         maxAge: 60 * 60 * 24, // 24h
         sameSite: 'lax',
         path: '/',
      })
   }

   /* ─── 회원이 아니고 보호 페이지면 → 로그인으로 리다이렉트 ───*/
   if (!user && matchProtected(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL(ROUTE_LOGIN, req.url))
   }

   /* ─── 로그인 상태인데 인증 페이지 접근 → 메인으로 보내기 ───*/
   if (user && AUTH_FORBIDDEN.includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/', req.url))
   }

   /* ─── viewport 쿼리 주입 (선택) ───*/
   const rewriteUrl = new URL(req.url)
   rewriteUrl.searchParams.set('viewport', getViewport(req))
   supabaseResponse.headers.set('x-middleware-rewrite', rewriteUrl.toString())

   // *** 반드시 supabaseResponse 그대로 반환해야 Set-Cookie 헤더가 유지됩니다! ***
   return supabaseResponse
}

/* ──────────────────────────────
 * 4. Middleware Entry
 * ──────────────────────────────*/
export async function middleware(req: NextRequest) {
   return authGate(req)
}

/* ──────────────────────────────
 * 5. Config (정적·이미지·API 제외)
 * ──────────────────────────────*/
export const config = {
   matcher: [
      '/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
   ],
}
