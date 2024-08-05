import { match } from 'path-to-regexp'
import { NextRequest, NextResponse, userAgent } from 'next/server'
import { auth } from '@/auth'

const matchersForAuth = ['/mypage']
const matchersForSignIn = ['/auth/*']
export async function middleware(request: NextRequest) {
   // auth 미들 웨어
   const session = await auth() // 세션 정보 확인
   console.log(session)
   if (isMatch(request.nextUrl.pathname, matchersForAuth)) {
      return session // 세션 정보 확인
         ? NextResponse.next()
         : NextResponse.redirect(new URL('/auth/login', request.url))
      // : NextResponse.redirect(new URL(`/signin?callbackUrl=${request.url}`, request.url))
   }
   if (isMatch(request.nextUrl.pathname, matchersForSignIn)) {
      return session
         ? NextResponse.redirect(new URL('/', request.url))
         : NextResponse.next()
   }
   // 현재 페이지 URL에 따라 viewport 설정
   const url = request.nextUrl
   const { device } = userAgent(request) // userAgent를 사용하여 디바이스 정보 추출
   const viewport = device.type === 'mobile' ? 'mobile' : 'desktop' // 모바일이면 'mobile', 아니면 'desktop'
   url.searchParams.set('viewport', viewport) // URL의 쿼리 파라미터로 viewport 설정

   return NextResponse.next()
}
function isMatch(pathname: string, urls: string[]) {
   return urls.some((url) => !!match(url)(pathname))
}
