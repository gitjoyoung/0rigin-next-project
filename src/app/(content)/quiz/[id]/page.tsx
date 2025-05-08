import { QUIZ_DATA } from '@/constants/quiz/quizData'
import { Metadata } from 'next'
import Quiz from './ui'
interface Params {
   params: {
      id: string
   }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
   const { id } = await params
   if (page === undefined) return { title: '퀴즈 페이지 입니다.' }
   return {
      title: `${id} 퀴즈 페이지`,
      description: `{id} 퀴즈 를 풀어 더 똑똑해지세요.`,
   }
}
export default async function page({ params }: Params) {
   const { id } = await params
   // 퀴즈 데이터를 나중에 서버에서 받아올 예정
   const { data } = QUIZ_DATA.find((q) => q.path === id)
   return (
      <div className="w-full flex justify-center">
         <div className="flex justify-center px-2 py-5  max-w-[600px] w-full">
            <Quiz quizData={data} />
         </div>
      </div>
   )
}
