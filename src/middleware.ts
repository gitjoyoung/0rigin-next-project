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

// 유틸리티 함수들
const isProtectedRoute = (pathname: string) =>
   PROTECTED_ROUTES.some((route) => match(route)(pathname))

const getViewportType = (request: NextRequest): 'mobile' | 'desktop' => {
   const { device } = userAgent(request)
   return device.type === 'mobile' ? 'mobile' : 'desktop'
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
   const { supabaseResponse, user } = await updateSession(request)

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
