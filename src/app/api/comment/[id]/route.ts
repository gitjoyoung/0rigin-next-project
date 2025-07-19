import { getUser } from '@/entities/auth/api/get-user'
import {
   deleteComment,
   getCommentById,
   updateComment,
} from '@/entities/comment'
import { NextRequest, NextResponse } from 'next/server'

// 권한 검증 함수
async function verifyCommentAuth(commentId: number, password?: string) {
   const comment = await getCommentById(commentId, true)
   if (!comment) {
      return { success: false, error: '댓글을 찾을 수 없습니다.' }
   }
   const user = await getUser()

   // 회원 댓글인 경우
   if (comment.author_id) {
      if (!user) {
         return { success: false, error: '로그인이 필요합니다.' }
      }
      if (comment.author_id !== user.id) {
         return {
            success: false,
            error: '본인의 댓글만 수정/삭제할 수 있습니다.',
         }
      }
      return { success: true }
   }

   // 게스트 댓글인 경우
   if (!comment.password) {
      return { success: false, error: '비밀번호가 설정되지 않은 댓글입니다.' }
   }

   if (!password) {
      return { success: false, error: '비밀번호를 입력해주세요.' }
   }

   if (comment.password !== password) {
      return { success: false, error: '비밀번호가 일치하지 않습니다.' }
   }

   return { success: true }
}

// PUT /api/comment/[id]
export async function PUT(
   request: NextRequest,
   { params }: { params: Promise<{ id: string }> },
) {
   const { id } = await params
   const body = await request.json()

   const authResult = await verifyCommentAuth(parseInt(id), body.password)
   if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 400 })
   }

   const updatedComment = await updateComment(parseInt(id), {
      content: body.content,
      is_edited: true,
   })

   return NextResponse.json(updatedComment)
}

// DELETE /api/comment/[id]
export async function DELETE(
   request: NextRequest,
   { params }: { params: Promise<{ id: string }> },
) {
   const { id } = await params
   const body = await request.json()

   const authResult = await verifyCommentAuth(parseInt(id), body?.password)
   if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 400 })
   }

   await deleteComment(parseInt(id))

   return NextResponse.json({ success: true })
}
