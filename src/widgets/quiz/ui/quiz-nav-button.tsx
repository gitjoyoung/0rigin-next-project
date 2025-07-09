'use client'

import { Button } from '@/shared/shadcn/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'

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
      <div className="flex gap-2 w-full justify-between sm:mx-auto">
         <Button
            type="button"
            size="lg"
            onClick={handlePrevious}
            disabled={isFirstDisabled}
         >
            이전
            <ArrowLeft size={20} />
         </Button>
         <Button type="button" size="lg" onClick={handleNext}>
            {isLastQuestion ? '결과 보기' : '다음'}
            <ArrowRight size={20} />
         </Button>
      </div>
   )
}
