import { Quiz } from '@/entities/quiz/types'
import { Card, CardContent } from '@/shared/shadcn/ui/card'
import { nanoid } from 'nanoid'
import Link from 'next/link'

interface Props {
   quizList: Quiz[]
}

export default function QuizBoardList({ quizList }: Props) {
   const DEFAULT_IMAGE = '/images/mascot/logo.webp'

   return (
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
         {quizList.map((quiz) => (
            <Card
               key={nanoid()}
               className="overflow-hidden hover:shadow-md transition-shadow h-full"
            >
               <Link
                  href={`/quiz/${quiz.id}`}
                  className="flex p-3 gap-3 h-full items-center"
               >
                  <div className="w-16 h-16 shrink-0 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-md overflow-hidden">
                     <img
                        src={DEFAULT_IMAGE}
                        alt={quiz.title}
                        className="w-full h-full object-cover"
                     />
                  </div>
                  <CardContent className="flex flex-col justify-between p-0 min-w-0">
                     <div>
                        <div className="flex items-center gap-2 mb-1">
                           <h3 className="text-sm font-medium line-clamp-1">
                              {quiz.title}
                           </h3>
                           {/* 문제 개수 표시 */}
                           {quiz.question_count && quiz.question_count > 0 && (
                              <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full">
                                 {quiz.question_count}문제
                              </span>
                           )}
                        </div>
                        {quiz.description && (
                           <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                              {quiz.description}
                           </p>
                        )}
                     </div>
                     <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                        퀴즈 풀기 →
                     </div>
                  </CardContent>
               </Link>
            </Card>
         ))}
      </ul>
   )
}
