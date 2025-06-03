import { Card, CardContent } from '@/shared/shadcn/ui/card'
import { nanoid } from 'nanoid'
import Link from 'next/link'
import type { QuizBoardData } from '../types/quizTypes'

interface Props {
   quizList: QuizBoardData[]
}

export default function QuizBoardList({ quizList: quizList }: Props) {
   const DEFAULT_IMAGE = '/images/mascot/logo.webp'

   return (
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
         {quizList.map((item) => (
            <Card
               key={nanoid()}
               className="overflow-hidden hover:shadow-md transition-shadow h-full"
            >
               <Link
                  href={`/quiz/${item.path}`}
                  className="flex p-3 gap-3 h-full items-center"
               >
                  <div className="w-16 h-16 shrink-0 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-md overflow-hidden">
                     <img
                        src={item.imageSrc || DEFAULT_IMAGE}
                        alt={item.name}
                        className="w-full h-full object-contain"
                     />
                  </div>
                  <CardContent className="flex flex-col justify-between p-0 min-w-0">
                     <div>
                        <h3 className="text-sm font-medium mb-1 line-clamp-1">
                           {item.name}
                        </h3>
                        {item.description && (
                           <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                              {item.description}
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
