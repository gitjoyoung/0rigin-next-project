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
      const { searchParams } = new URL(request.url)
      const postId = searchParams.get('postId')
      const category = searchParams.get('category')

      if (!postId || !category) {
         return NextResponse.json(
            { error: 'Missing postId or category parameter' },
            { status: 400 },
         )
      }

      // 특정 게시물 페이지 재생성
      const postPath = `/board/${category}/${postId}`
      revalidatePath(postPath)

      // 해당 카테고리 목록 페이지도 재생성
      revalidatePath(`/board/${category}`)

      console.log(`🔄 Revalidated post: ${postPath}`)
      console.log(`🔄 Revalidated category: /board/${category}`)

      return NextResponse.json({
         revalidated: true,
         paths: [postPath, `/board/${category}`],
         timestamp: new Date().toISOString(),
      })
   } catch (error) {
      console.error('❌ Post revalidation error:', error)
      return NextResponse.json(
         { error: 'Failed to revalidate post' },
         { status: 500 },
      )
   }
}
