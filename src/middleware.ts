import { nanoid } from 'nanoid'
import { NextRequest, NextResponse, userAgent } from 'next/server'
import { match } from 'path-to-regexp'
import {
   ROUTE_FORGET,
   ROUTE_LOGIN,
   ROUTE_MY_PAGE,
   ROUTE_SIGN,
   ROUTE_SIGN_FORM,
   ROUTE_SIGN_TERM,
} from './constants/pathname'
import { updateSession } from './lib/supabase/supabase-session'

// 상수 정의
const PROTECTED_ROUTES = [ROUTE_MY_PAGE]
export const AUTH_FORBIDDEN_ROUTES = [
   ROUTE_LOGIN,
   ROUTE_SIGN,
   ROUTE_SIGN_FORM,
   ROUTE_SIGN_TERM,
   ROUTE_FORGET,
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
      os: os.name,
      language:
         request.headers.get('accept-language')?.split(',')[0] || 'unknown',
      referrer: request.headers.get('referer') || 'direct',
      page_url: request.nextUrl.pathname,
   }

   // 매 방문마다 저장 (기존 방문자도 새 페이지 방문 시 기록)
   const { data, error } = await supabase
      .from('visitors')
      .insert(visitorData)
      .select('id')
      .single()

   return {
      id: cookieId,
      isNewVisitor: !request.cookies.get('visitor_id')?.value,
   }
}

// 인증 페이지 처리
const handleAuth = async (request: NextRequest, user: any) => {
   // 로그인된 사용자가 로그인/회원가입 페이지에 접근하는 경우
   if (user && AUTH_FORBIDDEN_ROUTES.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/', request.url))
   }

   // 보호된 경로에 대한 인증 체크
   if (isProtectedRoute(request.nextUrl.pathname) && !user) {
      return NextResponse.redirect(new URL(ROUTE_LOGIN, request.url))
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
       * Feel free to modify this pattern to include more paths.
       */
      '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
   ],
}
