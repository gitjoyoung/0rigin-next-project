import QuizBoard from '@/components/Quiz/QuizBoard'
import { QUIZ_DATA } from '@/constants/quiz/quizData'

export default function page() {
   // 향후 서버에서 퀴즈 데이터를 받아올 예정
   return <QuizBoard quizData={QUIZ_DATA} />
}
