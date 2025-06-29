import { createComment, getComments } from '@/entities/comment'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/comment?postId={postId}
export async function GET(request: NextRequest) {
   try {
      const { searchParams } = new URL(request.url)
      const postId = searchParams.get('postId')

      if (!postId) {
         return NextResponse.json(
            { error: 'postId는 필수입니다.' },
            { status: 400 },
         )
      }

      const comments = await getComments(postId)
      return NextResponse.json(comments)
   } catch (error) {
      console.error('댓글 조회 에러:', error)
      return NextResponse.json(
         { error: '댓글을 불러올 수 없습니다.' },
         { status: 500 },
      )
   }
}

// POST /api/comment
export async function POST(request: NextRequest) {
   try {
      const body = await request.json()
      const comment = await createComment(body)
      return NextResponse.json(comment)
   } catch (error) {
      console.error('댓글 생성 에러:', error)
      return NextResponse.json(
         { error: '댓글 생성에 실패했습니다.' },
         { status: 500 },
      )
   }
}
