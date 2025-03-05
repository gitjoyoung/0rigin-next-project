'use client'

import { Button } from '@/shared/shadcn/ui/button'
import React from 'react'

interface Props {
   quizDataLength: number
   curIndex: number
   setCurIndex: React.Dispatch<React.SetStateAction<number>>
}

export default function QuizNavButton({
   quizDataLength,
   curIndex,
   setCurIndex,
}: Props) {
   const isFirstDisabled = curIndex === 0
   const isLastDisabled = curIndex === quizDataLength - 1

   const handleNavigate = (step: 1 | -1) => {
      setCurIndex((prevIndex) => {
         const nextIndex = prevIndex + step
         return Math.max(0, Math.min(nextIndex, quizDataLength - 1))
      })
   }

   return (
      <div className="mx-2 flex max-w-xl justify-between sm:mx-auto">
         <Button
            type="button"
            className="px-6 py-4"
            onClick={() => handleNavigate(-1)}
            disabled={isFirstDisabled}
         >
            이전
         </Button>
         <Button
            type="button"
            className="px-6 py-4"
            onClick={() => handleNavigate(1)}
            disabled={isLastDisabled}
         >
            다음
         </Button>
      </div>
   )
}
