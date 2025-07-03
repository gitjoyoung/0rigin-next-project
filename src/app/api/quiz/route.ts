import { getUser } from '@/entities/auth/api/get-user'
import { createQuiz } from '@/entities/quiz'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
   try {
      const user = await getUser()
      if (!user) {
         return NextResponse.json(
            { error: '로그인이 필요합니다.' },
            { status: 401 },
         )
      }

      const body = await request.json()
      const { title, description, is_public, time_limit, pass_score } = body

      if (!title || !title.trim()) {
         return NextResponse.json(
            { error: '퀴즈 제목은 필수입니다.' },
            { status: 400 },
         )
      }

      const quiz = await createQuiz(
         {
            title: title.trim(),
            description: description?.trim() || '',
            is_public: is_public ?? true,
            time_limit: time_limit ? parseInt(time_limit) : undefined,
            pass_score: pass_score ? parseInt(pass_score) : 60,
         },
         user.id,
      )

      return NextResponse.json(quiz)
   } catch (error) {
      console.error('퀴즈 생성 오류:', error)
      return NextResponse.json(
         { error: '퀴즈 생성에 실패했습니다.' },
         { status: 500 },
      )
   }
}
