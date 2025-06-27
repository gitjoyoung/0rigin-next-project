import { checkPostLike, togglePostLike } from '@/entities/post/api/like-api'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/post/[id]/like - 좋아요 상태 확인
export async function GET(
   request: NextRequest,
   { params }: { params: { id: string } },
) {
   try {
      const { id } = params
      const isLiked = await checkPostLike(parseInt(id))
      return NextResponse.json({ isLiked })
   } catch (error) {
      console.error('좋아요 상태 확인 에러:', error)
      return NextResponse.json(
         { error: '좋아요 상태를 확인할 수 없습니다.' },
         { status: 500 },
      )
   }
}

// POST /api/post/[id]/like - 좋아요 토글
export async function POST(
   request: NextRequest,
   { params }: { params: { id: string } },
) {
   try {
      const { id } = params
      const result = await togglePostLike(parseInt(id))
      return NextResponse.json(result)
   } catch (error) {
      console.error('좋아요 토글 에러:', error)
      return NextResponse.json(
         { error: '좋아요 처리에 실패했습니다.' },
         { status: 500 },
      )
   }
}
