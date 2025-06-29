import { getUserServer } from '@/entities/auth'
import { createQuizQuestion } from '@/entities/quiz'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
   try {
      const user = await getUserServer()
      if (!user) {
         return NextResponse.json(
            { error: '로그인이 필요합니다.' },
            { status: 401 },
         )
      }

      const body = await request.json()
      const {
         quiz_id,
         question_number,
         question_text,
         question_type,
         points,
         explanation,
         media_url,
         option_count,
         option_1,
         option_2,
         option_3,
         option_4,
         option_5,
         correct_answer,
      } = body

      if (!quiz_id || !question_text || !option_1 || !option_2) {
         return NextResponse.json(
            { error: '필수 필드가 누락되었습니다.' },
            { status: 400 },
         )
      }

      if (correct_answer < 1 || correct_answer > option_count) {
         return NextResponse.json(
            { error: '정답 번호가 유효하지 않습니다.' },
            { status: 400 },
         )
      }

      const question = await createQuizQuestion({
         quiz_id: parseInt(quiz_id),
         question_number: parseInt(question_number),
         question_text: question_text.trim(),
         question_type: question_type || 'multiple_choice',
         points: points || 1,
         explanation: explanation?.trim() || '',
         media_url: media_url?.trim(),
         option_count: parseInt(option_count),
         option_1: option_1.trim(),
         option_2: option_2.trim(),
         option_3: option_3?.trim(),
         option_4: option_4?.trim(),
         option_5: option_5?.trim(),
         correct_answer: parseInt(correct_answer),
      })

      return NextResponse.json(question)
   } catch (error) {
      console.error('퀴즈 문제 생성 오류:', error)
      return NextResponse.json(
         { error: '퀴즈 문제 생성에 실패했습니다.' },
         { status: 500 },
      )
   }
}
