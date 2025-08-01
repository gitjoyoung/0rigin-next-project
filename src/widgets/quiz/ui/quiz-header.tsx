import { QuizDetail } from '@/entities/quiz'
import { Badge } from '@/shared/shadcn/ui/badge'
import { Card, CardContent } from '@/shared/shadcn/ui/card'
import Image from 'next/image'

interface Props {
   quizData: QuizDetail
}

export default function QuizHeader({ quizData }: Props) {
   const { title, description } = quizData
   const DEFAULT_IMAGE = '/images/mascot/logo.webp'

   return (
      <Card className="shadow-lg border-0 rounded-t-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-none">
         <CardContent className="p-3 sm:p-6">
            {/* 모든 화면에서 가로 배치 */}
            <div className="flex items-center gap-3 sm:gap-4">
               {/* 퀴즈 이미지 */}
               <div className="w-12 h-12 sm:w-20 sm:h-20 shrink-0 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center overflow-hidden shadow-md">
                  <Image
                     src={DEFAULT_IMAGE}
                     alt={title || '퀴즈 이미지'}
                     className="w-full h-full object-cover"
                     width={100}
                     height={100}
                  />
               </div>

               {/* 퀴즈 정보 */}
               <div className="flex-1 min-w-0">
                  <div className="flex  flex-row items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                     <h1 className="text-base sm:text-2xl font-bold text-slate-900 dark:text-slate-100 truncate">
                        {title || '퀴즈'}
                     </h1>
                     <Badge
                        variant="secondary"
                        className="w-fit text-xs shrink-0"
                     >
                        퀴즈
                     </Badge>
                  </div>

                  {description && (
                     <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-1 sm:line-clamp-2">
                        {description}
                     </p>
                  )}
               </div>
            </div>
         </CardContent>
      </Card>
   )
}
