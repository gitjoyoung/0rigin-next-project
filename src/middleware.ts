
export { auth as middleware } from "@/auth"

// import { NextResponse, userAgent } from 'next/server'
// import { auth } from '@/auth'
// export async function middleware(request) {
//    // auth 미들 웨어
//    const authResponse = await auth(request)
//    if (authResponse) {
//       return authResponse
//    }
//    // 다음 미들웨어
//    const url = request.nextUrl
//    const { device } = userAgent(request) // userAgent를 사용하여 디바이스 정보 추출
//    const viewport = device.type === 'mobile' ? 'mobile' : 'desktop' // 모바일이면 'mobile', 아니면 'desktop'
//    // console.log('device', device)
//    url.searchParams.set('viewport', viewport) // URL의 쿼리 파라미터로 viewport 설정
//    console.log('viewport', viewport)
//    return NextResponse.rewrite(request.nextUrl)
// }
