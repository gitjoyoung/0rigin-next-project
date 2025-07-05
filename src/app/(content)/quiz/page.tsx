import { getQuizzes } from '@/entities/quiz/api/quiz-api'
import QuizBoard from './ui/QuizBoard'

export default async function QuizPage() {
   // API에서 퀴즈 목록 가져오기
   const quizzes = await getQuizzes(50, 0) // 최대 50개 퀴즈 가져오기

   return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
         <div className="container mx-auto px-4 py-6">
            <QuizBoard quizList={quizzes} />
         </div>
      </div>
   )
}
