import { QUIZ_DATA } from '@/constants/quiz/quizData'
import QuizBoard from './ui/QuizBoard'

export default function page() {
   return <QuizBoard quizList={QUIZ_DATA} />
}
