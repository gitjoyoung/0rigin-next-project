import React from 'react'

interface Props {
   isCorrect: boolean
}

export default function QuizSubmit({ isCorrect }: Props) {
   return (
      <div className="flex justify-center my-4">
         <button type="submit" className="p-2 px-5 " disabled={isCorrect}>
            제출하기
         </button>
      </div>
   )
}
