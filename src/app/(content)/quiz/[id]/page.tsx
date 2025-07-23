import { getQuizById } from '@/entities/quiz/api/quiz-api'
import Quiz from '@/widgets/quiz/ui/quiz'
import QuizHeader from '@/widgets/quiz/ui/quiz-header'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface Params {
   params: {
      id: string
   }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
   const { id } = await params

   const quiz = await getQuizById(Number(id))
   if (!quiz) {
      return {
         title: '퀴즈를 찾을 수 없습니다 - 0RIGIN(제로리진)',
         description: '요청하신 퀴즈를 찾을 수 없습니다.',
      }
   }

   return {
      title: `${quiz.title} - 0RIGIN(제로리진) 퀴즈 페이지`,
      description:
         quiz.description ||
         `0RIGIN(제로리진)에서 ${quiz.title} 퀴즈를 풀어 더 똑똑해지세요.`,
   }
}

export default async function QuizDetailPage({ params }: Params) {
   const { id } = await params
   const quiz = await getQuizById(Number(id))

   if (!quiz) {
      notFound()
   }

   return (
      <div className="w-full min-h-screen flex flex-col justify-start items-center ">
         <div className="flex flex-col justify-start px-4 py-6 max-w-[600px] w-full">
            <QuizHeader quizData={quiz} />
            <Quiz quizData={quiz} />
         </div>
      </div>
   )
}
