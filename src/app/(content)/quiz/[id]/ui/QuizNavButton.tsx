'use client'

import { Button } from '@/shared/shadcn/ui/button'
import { Icons } from '@/shared/ui/icons'
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
      <div className=" flex gap-2 w-full justify-between sm:mx-auto">
         <Button
            type="button"
            size="lg"
            onClick={() => handleNavigate(-1)}
            disabled={isFirstDisabled}
         >
            이전
            <Icons.arrowLeft size={20} />
         </Button>
         <Button
            type="button"
            size="lg"
            onClick={() => handleNavigate(1)}
            disabled={isLastDisabled}
         >
            다음
            <Icons.arrowRight size={20} />
         </Button>
      </div>
   )
}
