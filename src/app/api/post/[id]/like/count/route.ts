import { getPostLikeCount } from '@/entities/post-like'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/post/[id]/like/count - 좋아요 수 조회
export async function GET(
   request: NextRequest,
   { params }: { params: { id: string } },
) {
   try {
      const { id } = params
      const count = await getPostLikeCount(parseInt(id))

      return NextResponse.json({ count })
   } catch (error) {
      console.error('좋아요 수 조회 에러:', error)
      return NextResponse.json(
         { error: '좋아요 수를 불러올 수 없습니다.' },
         { status: 500 },
      )
   }
}
