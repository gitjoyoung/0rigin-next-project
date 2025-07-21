import {
   createPostLike,
   deletePostLike,
   getPostLike,
   getPostLikeCount,
} from '@/entities/post-like'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
   request: NextRequest,
   { params }: { params: Promise<{ id: string }> },
) {
   const { id } = await params
   const userKey = request.nextUrl.searchParams.get('userKey')
   const data = await getPostLikeCount(Number(id))
   const hasLiked = data.some(
      (item) => item.user_id === userKey || item.anon_key === userKey,
   )

   return NextResponse.json({
      count: data.length,
      hasLiked,
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
