import CustomTitle from '@/components/common/links/CustomTitleLink'
import { ROUTE_QUIZ } from '@/constants/pathname'
import type { QuizBoardData } from '../types/quizTypes'
import QuizBoardList from './QuizBoardList'

interface Props {
   quizList: QuizBoardData[]
}

export default function QuizBoard({ quizList }: Props) {
   return (
      <div className="p-2">
         <CustomTitle
            title="퀴즈"
            subTitle="매일매일 더 똑똑해지는 0rigin 퀴즈!"
            link={ROUTE_QUIZ}
         />
         <QuizBoardList quizList={quizList} />
      </div>
   )
}
