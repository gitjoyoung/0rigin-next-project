import {
   createPostLike,
   deletePostLike,
   getPostLike,
} from '@/entities/post-like'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/post/[id]/like - 좋아요 상태 확인
export async function GET(
   request: NextRequest,
   { params }: { params: { id: string } },
) {
   try {
      const { id } = params

      // 요청 헤더에서 사용자 식별 정보 추출
      const userId = request.headers.get('x-user-id')
      const anonKey = request.headers.get('x-anon-key')

      const postLike = await getPostLike(
         parseInt(id),
         userId || undefined,
         anonKey || undefined,
      )

      return NextResponse.json({
         isLiked: !!postLike,
         likeId: postLike?.id,
         createdAt: postLike?.created_at,
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
   { params }: { params: { id: string } },
) {
   try {
      const { id } = params
      const postId = parseInt(id)

      // 요청 헤더에서 사용자 식별 정보 추출
      const userId = request.headers.get('x-user-id')
      const anonKey = request.headers.get('x-anon-key')

      if (!userId && !anonKey) {
         return NextResponse.json(
            { error: '사용자 식별 정보가 필요합니다.' },
            { status: 400 },
         )
      }

      // 기존 좋아요 상태 확인
      const existingLike = await getPostLike(
         postId,
         userId || undefined,
         anonKey || undefined,
      )

      if (existingLike) {
         // 좋아요가 있으면 삭제 (토글 off)
         await deletePostLike(existingLike.id)
         return NextResponse.json({
            isLiked: false,
            message: '좋아요가 취소되었습니다.',
         })
      } else {
         // 좋아요가 없으면 생성 (토글 on)
         const newLike = await createPostLike({
            post_id: postId,
            ...(userId ? { user_id: userId } : {}),
            ...(anonKey ? { anon_key: anonKey } : {}),
         })

         return NextResponse.json({
            isLiked: true,
            likeId: newLike.id,
            createdAt: newLike.created_at,
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
