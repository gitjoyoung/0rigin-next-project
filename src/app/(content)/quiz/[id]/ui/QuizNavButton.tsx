'use client'

import { Button } from '@/shared/shadcn/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import React from 'react'

interface Props {
   quizDataLength: number
   curIndex: number
   setCurIndex: React.Dispatch<React.SetStateAction<number>>
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

   const handleNavigate = (step: 1 | -1) => {
      setCurIndex((prevIndex) => {
         const nextIndex = prevIndex + step
         return Math.max(0, Math.min(nextIndex, quizDataLength - 1))
      })
   }

   const handleNext = () => {
      if (isLastQuestion && onShowResult) {
         onShowResult()
      } else {
         handleNavigate(1)
      }
   }

   return (
      <div className=" flex gap-2 w-full justify-between sm:mx-auto">
         <Button
            type="button"
            size="lg"
            onClick={() => handleNavigate(-1)}
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
