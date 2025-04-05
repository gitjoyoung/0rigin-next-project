import { ROUTE_QUIZ } from '@/constants/pathname'
import Link from 'next/link'
import type { QuizBoardData } from '../types/quizTypes'
import QuizBoardList from './QuizBoardList'

interface Props {
   quizList: QuizBoardData[]
}

export default function QuizBoard({ quizList }: Props) {
   return (
      <div className="p-2">
         <Link href={ROUTE_QUIZ} className="text-2xl font-bold">
            퀴즈
         </Link>
         <QuizBoardList quizList={quizList} />
      </div>
   )
}
