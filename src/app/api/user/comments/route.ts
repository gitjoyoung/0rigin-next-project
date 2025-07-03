import { getUser } from '@/entities/auth/api/get-user'
import { getCommentsByUserId } from '@/entities/comment'
import { NextResponse } from 'next/server'

export async function GET() {
   try {
      const user = await getUser()

      if (!user?.id) {
         return NextResponse.json(
            { error: '로그인이 필요합니다.' },
            { status: 401 },
         )
      }

      const comments = await getCommentsByUserId(user.id)

      return NextResponse.json({ comments })
   } catch (error) {
      console.error('사용자 댓글 조회 실패:', error)
      return NextResponse.json(
         { error: '댓글을 가져올 수 없습니다.' },
         { status: 500 },
      )
   }
}
