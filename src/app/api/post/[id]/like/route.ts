import { getUser } from '@/entities/auth/api/get-user'
import {
   createPostLike,
   deletePostLike,
   getPostLike,
   getPostLikeCount,
} from '@/entities/post-like'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/post/[id]/like - 좋아요 상태 및 수 확인
export async function GET(
   request: NextRequest,
   { params }: { params: Promise<{ id: string }> },
) {
   const { id } = await params
   const postId = parseInt(id)

   // 회원 정보
   const user = await getUser()
   const userId = user?.id

   // anonKey(비회원 세션) 쿼리에서 추출
   const { searchParams } = new URL(request.url)
   const anonKey = searchParams.get('anonKey') || undefined

   // 좋아요 상태와 수를 병렬로 조회
   const [postLike, likeCount] = await Promise.all([
      getPostLike(postId, userId, anonKey),
      getPostLikeCount(postId),
   ])

   return NextResponse.json({
      isLiked: !!postLike,
      likeId: postLike?.id,
      createdAt: postLike?.created_at,
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

   // 회원 정보
   const user = await getUser()
   const userId = user?.id

   // anonKey(비회원 세션) 바디에서 추출
   const body = await request.json().catch(() => ({}))
   const anonKey = body.anonKey || undefined

   if (!userId && !anonKey) {
      return NextResponse.json(
         { error: '로그인 또는 세션이 필요합니다.' },
         { status: 401 },
      )
   }

   // 기존 좋아요 상태 확인
   const existingLike = await getPostLike(postId, userId, anonKey)

   if (existingLike) {
      await deletePostLike(existingLike.id)
      const newCount = await getPostLikeCount(postId)
      return NextResponse.json({
         isLiked: false,
         count: newCount,
         message: '좋아요가 취소되었습니다.',
      })
   } else {
      const newLike = await createPostLike({
         post_id: postId,
         user_id: userId,
         anon_key: anonKey,
      })
      const newCount = await getPostLikeCount(postId)
      return NextResponse.json({
         isLiked: true,
         likeId: newLike.id,
         createdAt: newLike.created_at,
         count: newCount,
         message: '좋아요가 추가되었습니다.',
      })
   }
}
