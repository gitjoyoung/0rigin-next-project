import { verifyPostPassword } from '@/entities/post/api'
import { NextRequest, NextResponse } from 'next/server'

// POST /api/post/[id]/verify-password - 비밀번호 검증
export async function POST(
   req: NextRequest,
   { params }: { params: Promise<{ id: string }> },
) {
   const { password } = await req.json()
   const { id: postId } = await params

   // 게시글 비밀번호 검증
   const isValid = await verifyPostPassword(postId, password)

   if (isValid) {
      return NextResponse.json({ success: true })
   } else {
      return NextResponse.json(
         { success: false, message: '비밀번호가 일치하지 않습니다.' },
         { status: 401 },
      )
   }
}
