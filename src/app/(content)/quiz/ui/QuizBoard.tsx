import { ROUTE_QUIZ } from '@/constants/pathname'
import { Button } from '@/shared/shadcn/ui/button'
import { Separator } from '@/shared/shadcn/ui/separator'
import Link from 'next/link'
import type { QuizBoardData } from '../types/quizTypes'
import QuizBoardList from './QuizBoardList'

interface Props {
   quizList: QuizBoardData[]
}

export default function QuizBoard({ quizList }: Props) {
   return (
      <div className="p-2">
         <div className="flex justify-between items-center my-4">
            <Link href={ROUTE_QUIZ} className="text-2xl font-bold">
               퀴즈 페이지
            </Link>
            <Button variant={'outline'} asChild>
               <Link href={'/quiz/create'}>퀴즈 제작</Link>
            </Button>
         </div>

         <Separator className="my-4" />

         <QuizBoardList quizList={quizList} />
      </div>
   )
}
