import { auth } from '@/auth'
import { NextRequest, NextResponse, userAgent } from 'next/server'
import { match } from 'path-to-regexp'

import { createServerClient } from '@supabase/ssr'

export const createClient = (request: NextRequest) => {
   // Create an unmodified response
   let supabaseResponse = NextResponse.next({
      request: {
         headers: request.headers,
      },
   })

   const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
         cookies: {
            getAll() {
               return request.cookies.getAll()
            },
            setAll(cookiesToSet) {
               cookiesToSet.forEach(({ name, value, options }) =>
                  request.cookies.set(name, value),
               )
               supabaseResponse = NextResponse.next({
                  request,
               })
               cookiesToSet.forEach(({ name, value, options }) =>
                  supabaseResponse.cookies.set(name, value, options),
               )
            },
         },
      },
   )

   return supabaseResponse
}

// 인증이 필요한 경로 정의
const PROTECTED_ROUTES = ['/mypage']

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
