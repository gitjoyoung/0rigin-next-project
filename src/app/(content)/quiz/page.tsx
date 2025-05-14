import { QUIZ_DATA } from '@/shared/constants/quiz/quizData'
import QuizBoard from './ui/QuizBoard'

export default function page() {
   return <QuizBoard quizList={QUIZ_DATA} />
}
