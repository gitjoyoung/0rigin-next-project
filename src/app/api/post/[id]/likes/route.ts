import {
   getPostLikeCount,
   getPostLikeUsers,
} from '@/entities/post/api/like-api'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/post/[id]/likes?type=count|users
export async function GET(
   request: NextRequest,
   { params }: { params: { id: string } },
) {
   try {
      const { id } = params
      const { searchParams } = new URL(request.url)
      const type = searchParams.get('type')

      if (type === 'count') {
         const count = await getPostLikeCount(id)
         return NextResponse.json({ count })
      } else if (type === 'users') {
         const users = await getPostLikeUsers(id)
         return NextResponse.json({ users })
      } else {
         // 둘 다 반환
         const [count, users] = await Promise.all([
            getPostLikeCount(id),
            getPostLikeUsers(id),
         ])
         return NextResponse.json({ count, users })
      }
   } catch (error) {
      console.error('좋아요 정보 조회 에러:', error)
      return NextResponse.json(
         { error: '좋아요 정보를 불러올 수 없습니다.' },
         { status: 500 },
      )
   }
}
