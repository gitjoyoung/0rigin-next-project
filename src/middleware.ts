import { nanoid } from 'nanoid'
import { NextRequest, NextResponse, userAgent } from 'next/server'
import { match } from 'path-to-regexp'
import { checkSignupCompleteServer } from './entities/auth/api/google'
import {
   ROUTE_LOGIN,
   ROUTE_MY_PAGE,
   ROUTE_RESET_PASSWORD,
   ROUTE_SIGN,
   ROUTE_SIGN_FORM,
   ROUTE_SIGN_TERM,
} from './shared/constants/pathname'
import { updateSession } from './shared/lib/supabase/supabase-session'

// 상수 정의
const PROTECTED_ROUTES = [ROUTE_MY_PAGE]
export const AUTH_FORBIDDEN_ROUTES = [
   // 인증 필요 없는 경로
   ROUTE_LOGIN,
   ROUTE_SIGN,
   ROUTE_SIGN_TERM,
   ROUTE_RESET_PASSWORD,
]

// 보호된 경로 확인
const isProtectedRoute = (pathname: string) =>
   PROTECTED_ROUTES.some((route) => match(route)(pathname))

// 뷰포트 타입 확인
const getViewportType = (
   request: NextRequest,
): 'mobile' | 'tablet' | 'desktop' => {
   const { device } = userAgent(request)

   if (device.type === 'mobile') return 'mobile'
   if (device.type === 'tablet') return 'tablet'
   return 'desktop'
}

// 방문자 정보 저장 함수
const saveVisitorInfo = async (request: NextRequest, supabase: any) => {
   // 쿠키를 통해 이미 방문한 사용자인지 확인
   const cookieId = request.cookies.get('visitor_id')?.value || nanoid()

   // 방문자 정보 수집
   const { browser, device, engine, os } = userAgent(request)
   const visitorData = {
      visitor_id: cookieId,
      ip_address: request.headers.get('x-forwarded-for') || 'unknown',
      device_type: getViewportType(request),
      browser: browser.name,
      language:
         request.headers.get('accept-language')?.split(',')[0] || 'unknown',
      referrer: request.headers.get('referer') || 'direct',
      page_url: request.nextUrl.pathname,
   }

   // 매 방문마다 저장 (기존 방문자도 새 페이지 방문 시 기록)
   await supabase.from('visitors').insert(visitorData).select('id').single()

   return {
      id: cookieId,
      isNewVisitor: !request.cookies.get('visitor_id')?.value,
   }
}

// 인증 페이지 처리
const handleAuth = async (request: NextRequest, user: any) => {
   if (!user) {
      // 로그인하지 않은 사용자는 보호된 경로 접근 불가
      if (isProtectedRoute(request.nextUrl.pathname)) {
         return NextResponse.redirect(new URL(ROUTE_LOGIN, request.url))
      }
      return null
   }

   // 로그인한 사용자의 회원가입 상태 확인
   const isSignupComplete = await checkSignupCompleteServer()

   // 회원가입이 완료되지 않은 경우
   if (!isSignupComplete) {
      // 회원가입 관련 페이지로만 접근 가능
      if (
         ![ROUTE_SIGN, ROUTE_SIGN_FORM, ROUTE_SIGN_TERM].includes(
            request.nextUrl.pathname,
         )
      ) {
         return NextResponse.redirect(new URL(ROUTE_SIGN, request.url))
      }
      return null
   }

   // 회원가입이 완료된 경우
   // 로그인/회원가입 페이지 접근 불가
   if (AUTH_FORBIDDEN_ROUTES.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/', request.url))
   }

   return null
}

// 메인 미들웨어 함수
export async function middleware(request: NextRequest) {
   // 수파베이스에서 세션 정보 가져오기
   const { supabaseResponse, user, supabase } = await updateSession(request)

   // 방문자 정보 저장
   const { id: visitorId, isNewVisitor } = await saveVisitorInfo(
      request,
      supabase,
   )

   // 새 방문자인 경우 쿠키 설정
   if (isNewVisitor && visitorId) {
      supabaseResponse.cookies.set('visitor_id', visitorId, {
         httpOnly: true,
         maxAge: 60 * 60 * 24, // 24시간
         path: '/',
         sameSite: 'lax',
      })
   }

   // 인증 처리
   const authResponse = await handleAuth(request, user)
   if (authResponse) return authResponse

   // 뷰포트 설정
   const viewport = getViewportType(request)
   request.nextUrl.searchParams.set('viewport', viewport)

   return supabaseResponse
}

export const config = {
   matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico (favicon file)
       * - api (API routes)
       * Feel free to modify this pattern to include more paths.
       */
      '/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
   ],
}
