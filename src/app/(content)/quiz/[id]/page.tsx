import { QUIZ_DATA } from '@/constants/quiz/quizData'
import { Metadata } from 'next'
import Quiz from './ui/Quiz'
interface Params {
   params: {
      id: string
   }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
   const { id } = params
   if (page === undefined) return { title: '퀴즈 페이지 입니다.' }
   return {
      title: `${id} 퀴즈 `,
      description: `{id} 퀴즈 입니다.`,
   }
}
export default function page({ params }: Params) {
   const { id } = params
   // 퀴즈 데이터를 나중에 서버에서 받아올 예정
   const quiz = QUIZ_DATA.find((q) => q.path === id)
   return (
      <>
         <Quiz quizData={quiz.data} />
      </>
   )
}
