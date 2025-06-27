import { createPost } from '@/entities/post/api/post-api'
import { NextRequest, NextResponse } from 'next/server'

// POST /api/post
export async function POST(request: NextRequest) {
   try {
      const body = await request.json()
      const post = await createPost(body)
      return NextResponse.json(post)
   } catch (error) {
      console.error('게시글 생성 에러:', error)
      return NextResponse.json(
         { error: '게시글 생성에 실패했습니다.' },
         { status: 500 },
      )
   }
}
