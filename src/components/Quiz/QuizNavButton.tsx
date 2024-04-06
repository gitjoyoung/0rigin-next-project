import React from 'react'

interface Props {
   quizDataLength: number
   curIndex: number
   setCurIndex: React.Dispatch<React.SetStateAction<number>>
}

export default function QuizNavButton({
   curIndex,
   setCurIndex,
   quizDataLength,
}: Props) {
   const handleNext = () => {
      if (curIndex < quizDataLength - 1) {
         setCurIndex(curIndex + 1)
      }
   }

   const handlePrev = () => {
      if (curIndex > 0) {
         setCurIndex(curIndex - 1)
      }
   }
   return (
      <div className="flex justify-between mx-2 max-w-xl sm:mx-auto">
         <button type="button" className="p-3 px-4" onClick={handlePrev}>
            이전
         </button>
         <button type="button" className="p-3 px-4" onClick={handleNext}>
            다음
         </button>
      </div>
   )
}
