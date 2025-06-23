import { getUserServer } from '@/entities/auth/api/get-user-server'
import type { Metadata } from 'next'
import QuizCreateForm from './ui/quiz-ceate-form'
import QuizCreateAuthCheck from './ui/quiz-create-auth-check'

export const metadata: Metadata = {
   title: '퀴즈 제작',
   description: '퀴즈를 제작해 보세요',
}

export default async function QuizCreatePage() {
   // 로그인 상태 확인
   const user = await getUserServer()

   if (!user) {
      return <QuizCreateAuthCheck />
   }

   return <QuizCreateForm />
}
