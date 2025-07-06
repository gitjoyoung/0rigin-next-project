import { Badge } from '@/shared/shadcn/ui/badge'
import { Card, CardContent } from '@/shared/shadcn/ui/card'
import Image from 'next/image'

interface QuizData {
   id?: number
   title?: string
   description?: string
   name?: string
   imageSrc?: string
   [key: string]: any
}

interface Props {
   quizData: QuizData
}

export default function QuizHeader({ quizData }: Props) {
   const { imageSrc, name, title, description } = quizData
   const DEFAULT_IMAGE = imageSrc || '/images/mascot/logo.webp'

   return (
      <Card className="shadow-sm border rounded-none">
         <CardContent className="flex flex-col sm:flex-row items-center gap-4 p-4">
            {/* 퀴즈 이미지 */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center overflow-hidden">
               <Image
                  src={DEFAULT_IMAGE}
                  alt={title}
                  className="w-full h-full object-cover"
                  width={80}
               />
            </div>

            {/* 퀴즈 정보 */}
            <div className="flex-1 text-center sm:text-left">
               <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
                     {quizData?.name || quizData?.title || '퀴즈'}
                  </h1>
                  <Badge variant="secondary" className="w-fit text-xs">
                     퀴즈
                  </Badge>
               </div>

               {quizData?.description && (
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                     {quizData.description}
                  </p>
               )}
            </div>
         </CardContent>
      </Card>
   )
}
