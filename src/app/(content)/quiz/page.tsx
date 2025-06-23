import { getQuizzes } from '@/entities/quiz/api/quiz-api'
import QuizBoard from './ui/QuizBoard'

export default async function QuizPage() {
   try {
      // API에서 퀴즈 목록 가져오기
      const quizzes = await getQuizzes(50, 0) // 최대 50개 퀴즈 가져오기

      return (
         <div className="space-y-4">
            <QuizBoard quizList={quizzes} />
         </div>
      )
   } catch (error) {
      console.error('퀴즈 목록 로드 오류:', error)
      return (
         <div className="p-4">
            <div className="text-center">
               <h1 className="text-xl font-bold">오류가 발생했습니다.</h1>
               <p className="text-muted-foreground">
                  퀴즈 목록을 불러오는 중 문제가 발생했습니다.
               </p>
            </div>
         </div>
      )
   }
}
