import {
   createPostLike,
   deletePostLike,
   getPostLike,
   getPostLikeCount,
} from '@/entities/post-like'
import { NextRequest, NextResponse } from 'next/server'
// 클라이언트에서 보낼 데이터 생성 함수
export function createClientLikeRequest(
   userId?: string,
   anonKey?: string,
): { userId?: string; anonKey?: string } {
   if (userId) {
      return { userId }
   } else if (anonKey) {
      return { anonKey }
   } else {
      throw new Error('사용자 식별 정보가 필요합니다.')
   }
}
export async function GET(
   request: NextRequest,
   { params }: { params: Promise<{ id: string }> },
) {
   const { id } = await params
   const likeCount = await getPostLikeCount(Number(id))
   return NextResponse.json({
      count: likeCount,
   })
}

// POST /api/post/[id]/like - 좋아요 토글
export async function POST(
   request: NextRequest,
   { params }: { params: Promise<{ id: string }> },
) {
   const { id } = await params
   const postId = parseInt(id)
   const body = await request.json().catch(() => ({}))
   const { anonKey, isAuthenticated } = body

   const existingLike = await getPostLike(postId, anonKey, isAuthenticated)

   console.log('existingLike', existingLike)
   if (existingLike) {
      // 좋아요 취소
      await deletePostLike({
         post_id: postId,
         anon_key: anonKey,
         authenticated: isAuthenticated,
      })
      return NextResponse.json({
         isLiked: false,
         message: '좋아요가 취소되었습니다.',
      })
   } else {
      const createData = {
         post_id: postId,
         anon_key: anonKey,
         authenticated: isAuthenticated,
      }
      const newLike = await createPostLike(createData)
      return NextResponse.json({
         isLiked: true,
         likeId: newLike.id,
         createdAt: newLike.created_at,
         message: '좋아요가 추가되었습니다.',
      })
   }
}
