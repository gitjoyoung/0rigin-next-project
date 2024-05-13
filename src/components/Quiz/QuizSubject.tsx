import React from 'react'

interface Props {
   index: number
   question: string
}
export default function QuizSubject({ index, question }: Props) {
   return (
      <div>
         <h1 className="font-bold text-3xl">{index}.</h1>
         <h1 className="font-bold text-xl break-words">{question}</h1>
      </div>
   )
}
