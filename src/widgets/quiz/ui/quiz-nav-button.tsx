'use client'

import { Button } from '@/shared/shadcn/ui/button'
import { cn } from '@/shared/utils/cn'
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react'

interface Props {
   quizDataLength: number
   curIndex: number
   setCurIndex: (newIndex: number) => void
   onShowResult?: () => void
}

export default function QuizNavButton({
   quizDataLength,
   curIndex,
   setCurIndex,
   onShowResult,
}: Props) {
   const isFirstDisabled = curIndex === 0
   const isLastQuestion = curIndex === quizDataLength - 1

   const handleNext = () => {
      if (isLastQuestion && onShowResult) {
         onShowResult()
      } else {
         setCurIndex(curIndex + 1)
      }
   }

   const handlePrevious = () => {
      setCurIndex(curIndex - 1)
   }

   return (
      <div className="flex gap-3 w-full justify-between sm:mx-auto">
         <Button
            type="button"
            size="lg"
            onClick={handlePrevious}
            disabled={isFirstDisabled}
            variant="outline"
            className="flex-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 dark:text-gray-200"
         >
            <ArrowLeft size={18} className="mr-2" />
            이전
         </Button>
         <Button
            type="button"
            size="lg"
            onClick={handleNext}
            className={cn(
               'flex-1 transition-all duration-200 shadow-md hover:shadow-lg',
               isLastQuestion
                  ? 'bg-gray-800 hover:bg-gray-900 text-white border-gray-800'
                  : 'bg-gray-600 hover:bg-gray-700 text-white border-gray-600',
            )}
         >
            {isLastQuestion ? (
               <>
                  <CheckCircle size={18} className="mr-2" />
                  결과 보기
               </>
            ) : (
               <>
                  다음
                  <ArrowRight size={18} className="ml-2" />
               </>
            )}
         </Button>
      </div>
   )
}
