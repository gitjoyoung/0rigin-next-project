import React from 'react'
import QuizAnswerIcon from './QuizAnswerIcon'

interface Props {
   id: string
   index: number
   value: string
   answer: string
   isCorrect: boolean
   selectedOption: Record<string, boolean>
}

export default function QuizOptionList({
   id,
   index,
   value,
   answer,
   isCorrect,
   selectedOption,
}: Props) {
   return (
      <label className="border p-2 flex items-center" htmlFor={id}>
         <input
            className="mr-2"
            type="radio"
            id={id}
            name="option"
            value={id}
            disabled={isCorrect || selectedOption[id] === true}
         />
         <span className="text-sm ">{`${index + 1} . `} </span>
         <p className="font-semibold text-sm">{value + answer}</p>
         {selectedOption[id] && (
            <div className="h-5 w-5 mx-2 ">
               <QuizAnswerIcon id={id} answer={answer} />
            </div>
         )}
      </label>
   )
}
