import { NextRequest, NextResponse, userAgent } from 'next/server'

export function middleware(request: NextRequest) {
   const url = request.nextUrl
   const { device } = userAgent(request) // userAgent를 사용하여 디바이스 정보 추출
   const viewport = device.type === 'mobile' ? 'mobile' : 'desktop' // 모바일이면 'mobile', 아니면 'desktop'
   console.log('viewport', viewport)
   url.searchParams.set('viewport', viewport) // URL의 쿼리 파라미터로 viewport 설정
   return NextResponse.rewrite(request.nextUrl)
}
