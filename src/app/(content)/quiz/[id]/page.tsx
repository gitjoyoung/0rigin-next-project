import { getQuizById } from '@/entities/quiz/api/quiz-api'
import { Metadata } from 'next'
import Quiz from './ui'
import QuizHeader from './ui/quiz-header'

interface Params {
   params: {
      id: string
   }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
   const { id } = await params

   try {
      const quiz = await getQuizById(parseInt(id))
      if (quiz) {
         return {
            title: `${quiz.title} 퀴즈`,
            description:
               quiz.description ||
               `0RIGIN(제로리진)에서 ${quiz.title} 퀴즈를 풀어 더 똑똑해지세요.`,
         }
      }
   } catch (error) {
      console.error('퀴즈 메타데이터 생성 오류:', error)
   }

   return {
      title: '퀴즈 페이지',
      description: '0RIGIN(제로리진)에서 퀴즈를 풀어 더 똑똑해지세요.',
   }
}

export default async function QuizDetailPage({ params }: Params) {
   const { id } = await params

   try {
      const quiz = await getQuizById(parseInt(id))

      if (!quiz) {
         return (
            <div className="w-full flex flex-col justify-center items-center">
               <div className="flex flex-col justify-center px-2 py-5 max-w-[600px] w-full">
                  <div className="text-center">
                     <h1 className="text-xl font-bold">
                        퀴즈를 찾을 수 없습니다.
                     </h1>
                     <p className="text-muted-foreground">
                        요청하신 퀴즈가 존재하지 않거나 삭제되었습니다.
                     </p>
                  </div>
               </div>
            </div>
         )
      }

      return (
         <div className="w-full flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center px-2 py-5 max-w-[600px] w-full">
               <QuizHeader quizData={quiz} />
               <Quiz quizData={quiz} />
            </div>
         </div>
      )
   } catch (error) {
      console.error('퀴즈 상세 페이지 오류:', error)
      return (
         <div className="w-full flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center px-2 py-5 max-w-[600px] w-full">
               <div className="text-center">
                  <h1 className="text-xl font-bold">오류가 발생했습니다.</h1>
                  <p className="text-muted-foreground">
                     퀴즈를 불러오는 중 문제가 발생했습니다.
                  </p>
               </div>
            </div>
         </div>
      )
   }
}
