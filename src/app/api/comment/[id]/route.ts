import { deleteComment, updateComment } from '@/entities/comment'
import { NextRequest, NextResponse } from 'next/server'

// PUT /api/comment/[id]
export async function PUT(
   request: NextRequest,
   { params }: { params: { id: string } },
) {
   try {
      const { id } = await params
      const body = await request.json()

      const updatedComment = await updateComment(parseInt(id), {
         content: body.content,
         is_edited: true,
      })

      return NextResponse.json(updatedComment)
   } catch (error) {
      console.error('댓글 수정 에러:', error)
      return NextResponse.json(
         { error: '댓글 수정에 실패했습니다.' },
         { status: 500 },
      )
   }
}

// DELETE /api/comment/[id]
export async function DELETE(
   request: NextRequest,
   { params }: { params: { id: string } },
) {
   try {
      const { id } = await params

      await deleteComment(parseInt(id))

      return NextResponse.json({ success: true })
   } catch (error) {
      console.error('댓글 삭제 에러:', error)
      return NextResponse.json(
         { error: '댓글 삭제에 실패했습니다.' },
         { status: 500 },
      )
   }
}
