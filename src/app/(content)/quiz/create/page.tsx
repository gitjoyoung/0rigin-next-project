import type { Metadata } from 'next'
import QuizCreateForm from './ui/quiz-ceate-form'

export const metadata: Metadata = {
   title: '퀴즈 제작',
   description: '퀴즈를 제작해 보세요',
}

export default function page() {
   return (
      <div>
         <h1>퀴즈 제작</h1>
         <QuizCreateForm />
      </div>
   )
}
