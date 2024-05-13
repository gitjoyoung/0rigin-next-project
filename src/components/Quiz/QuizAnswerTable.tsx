import React from 'react'
import { v4 as uuid4 } from 'uuid'

interface Props {
   answerTable: { [key: number]: string | number | boolean | null | undefined }
}
export default function QuizAnswerTable({ answerTable }: Props) {
   return (
      <div className="w-36 flex  flex-wrap justify-center gap-1 border border-black">
         {Object.values(answerTable).map((index, i) => (
            <div
               key={uuid4()}
               className="flex border p-1 justify-center rounded-md font-bold"
            >
               <h1>
                  {i + 1}번 답 : {index}
               </h1>
            </div>
         ))}
      </div>
   )
}
