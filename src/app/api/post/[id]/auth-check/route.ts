import { getUser } from '@/entities/auth/api/get-user'
import { getPostById } from '@/entities/post/api'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/post/[id]/auth-check - 현재 사용자가 해당 게시글의 작성자인지 확인
export async function GET(
   request: NextRequest,
   { params }: { params: Promise<{ id: string }> },
) {
   try {
      const { id: postId } = await params

      // 현재 로그인한 사용자 정보 가져오기
      const user = await getUser()

      // 게시글 정보 조회
      const post = await getPostById(Number(postId))
      if (!post) {
         return NextResponse.json(
            { error: '게시글을 찾을 수 없습니다.' },
            { status: 404 },
         )
      }

      // 로그인한 사용자가 작성자인지 확인
      const isAuthor = user && post.author_id && user.id === post.author_id

      return NextResponse.json({
         isAuthor: !!isAuthor,
         isLoggedIn: !!user,
         postAuthorId: post.author_id,
         currentUserId: user?.id || null,
      })
   } catch (error) {
      console.error('작성자 확인 에러:', error)
      return NextResponse.json(
         { error: '작성자 확인에 실패했습니다.' },
         { status: 500 },
      )
   }
}
