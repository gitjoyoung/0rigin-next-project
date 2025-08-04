import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
   // 개발환경에서만 사용 가능 (프로덕션에서는 내부 revalidatePath 사용)
   if (process.env.NODE_ENV !== 'development') {
      return NextResponse.json(
         { error: 'This API is only available in development' },
         { status: 403 },
      )
   }

   try {
      const { searchParams } = new URL(request.url)
      const category = searchParams.get('category')

      // 특정 카테고리 재생성
      if (category) {
         revalidatePath(`/board/${category}`)
         console.log(`🔄 Revalidated: /board/${category}`)

         return NextResponse.json({
            revalidated: true,
            path: `/board/${category}`,
            timestamp: new Date().toISOString(),
         })
      }

      // 전체 게시판 재생성
      revalidatePath('/board/[category]', 'page')
      revalidateTag('board-posts')

      console.log('🔄 Revalidated: All board pages')

      return NextResponse.json({
         revalidated: true,
         scope: 'all-board-pages',
         timestamp: new Date().toISOString(),
      })
   } catch (error) {
      console.error('❌ Revalidation error:', error)
      return NextResponse.json(
         { error: 'Failed to revalidate' },
         { status: 500 },
      )
   }
}

// GET 요청으로도 동작 (개발용)
export async function GET(request: NextRequest) {
   return POST(request)
}
