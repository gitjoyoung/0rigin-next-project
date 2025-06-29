import { getUserServer } from '@/entities/auth/api/get-user-server'
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
   try {
      const { id } = await params
      const postId = parseInt(id)

      // Supabase 세션에서 사용자 정보 가져오기
      const user = await getUserServer()
      const userId = user?.id

      // 좋아요 상태와 수를 병렬로 조회
      const [postLike, likeCount] = await Promise.all([
         getPostLike(postId, userId || undefined),
         getPostLikeCount(postId),
      ])

      return NextResponse.json({
         isLiked: !!postLike,
         likeId: postLike?.id,
         createdAt: postLike?.created_at,
         count: likeCount,
      })
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
   { params }: { params: Promise<{ id: string }> },
) {
   try {
      const { id } = await params
      const postId = parseInt(id)

      // Supabase 세션에서 사용자 정보 가져오기
      const user = await getUserServer()
      const userId = user?.id

      if (!userId) {
         return NextResponse.json(
            { error: '로그인이 필요합니다.' },
            { status: 401 },
         )
      }

      // 기존 좋아요 상태 확인
      const existingLike = await getPostLike(postId, userId)

      if (existingLike) {
         // 좋아요가 있으면 삭제 (토글 off)
         await deletePostLike(existingLike.id)
         const newCount = await getPostLikeCount(postId)
         return NextResponse.json({
            isLiked: false,
            count: newCount,
            message: '좋아요가 취소되었습니다.',
         })
      } else {
         // 좋아요가 없으면 생성 (토글 on)
         const newLike = await createPostLike({
            post_id: postId,
            user_id: userId,
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
   } catch (error) {
      console.error('좋아요 토글 에러:', error)
      return NextResponse.json(
         { error: '좋아요 처리에 실패했습니다.' },
         { status: 500 },
      )
   }
}
