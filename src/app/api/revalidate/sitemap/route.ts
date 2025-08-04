import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
   // 개발환경에서만 사용 가능
   if (process.env.NODE_ENV !== 'development') {
      return NextResponse.json(
         { error: 'This API is only available in development' },
         { status: 403 },
      )
   }

   try {
      // 사이트맵 재생성
      revalidatePath('/sitemap.xml')

      console.log('🗺️ Sitemap revalidated')

      return NextResponse.json({
         revalidated: true,
         path: '/sitemap.xml',
         timestamp: new Date().toISOString(),
      })
   } catch (error) {
      console.error('❌ Sitemap revalidation error:', error)
      return NextResponse.json(
         { error: 'Failed to revalidate sitemap' },
         { status: 500 },
      )
   }
}

// GET 요청으로도 동작 (개발용)
export async function GET(request: NextRequest) {
   return POST(request)
}
