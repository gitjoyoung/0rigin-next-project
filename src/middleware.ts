import { auth } from '@/auth'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { NextRequest, NextResponse, userAgent } from 'next/server'
import { match } from 'path-to-regexp'

// 인증이 필요한 경로 정의
const PROTECTED_ROUTES = ['/mypage']

const locales = ['ko']
const defaultLocale = 'ko'

function getLocale(request: NextRequest): string {
   const negotiatorHeaders: Record<string, string> = {}
   request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

   const languages = new Negotiator({ headers: negotiatorHeaders }).languages()
   return matchLocale(languages, locales, defaultLocale)
}

export async function middleware(request: NextRequest) {
   // 보호된 경로 체크
   if (isProtectedRoute(request.nextUrl.pathname)) {
      const session = await auth()
      if (!session) {
         return NextResponse.redirect(new URL('/auth/login', request.url))
      }
   }

   // 뷰포트 설정
   const response = NextResponse.next()
   const viewport = getViewportType(request)
   request.nextUrl.searchParams.set('viewport', viewport)

   const pathname = request.nextUrl.pathname
   const pathnameIsMissingLocale = locales.every(
      (locale) =>
         !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
   )

   // 리다이렉트가 필요한 경우
   if (pathnameIsMissingLocale) {
      const locale = getLocale(request)
      return NextResponse.redirect(
         new URL(`/${locale}${pathname}`, request.url),
      )
   }

   return response
}

// 보호된 경로 체크 함수
function isProtectedRoute(pathname: string) {
   return PROTECTED_ROUTES.some((route) => !!match(route)(pathname))
}

// 뷰포트 타입 결정 함수
function getViewportType(request: NextRequest): 'mobile' | 'desktop' {
   const { device } = userAgent(request)
   return device.type === 'mobile' ? 'mobile' : 'desktop'
}

export const config = {
   matcher: [
      // Skip all internal paths (_next)
      '/((?!_next|api|favicon.ico).*)',
   ],
}
