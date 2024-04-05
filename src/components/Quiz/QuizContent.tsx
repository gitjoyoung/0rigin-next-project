'use client'

import { QuizData } from '@/types/quizTypes'
import { useState } from 'react'

interface Props {
   quizData: QuizData
}
export default function QuizContent({ quizData }: Props) {
   const [showExplanation, setShowExplanation] = useState(false)

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      const option = formData.get('option')
      if (option === quizData.answer) {
         console.log('correct')
      } else {
         console.log('wrong')
      }
   }
   const hintOpen = () => {
      setShowExplanation((prev) => !prev)
   }
   return (
      <article className="border max-w-xl px-4  sm:mx-auto mx-2 my-3 py-4 gap-3 flex flex-col">
         <h1 className="font-semibold text-xl break-words">
            {quizData.question}
         </h1>
         <form onSubmit={handleSubmit} className="flex flex-col ">
            <div className="flex-col flex text-xl  gap-2 my-2 justify-center">
               {quizData.options.map(({ id, value }) => (
                  <label className="border p-2 text-sm" htmlFor={id} key={id}>
                     <input
                        className="mr-2"
                        type="radio"
                        id={id}
                        name="option"
                        value={id}
                     />
                     {value}
                  </label>
               ))}
            </div>

            <div className="flex justify-center">
               <button type="submit" className="p-2 px-5">
                  Submit
               </button>
            </div>
            <div>
               <button type="button" onClick={hintOpen} className=" px-5">
                  힌트보기
               </button>
            </div>
            <div className="my-3">
               {showExplanation && (
                  <div className="my-3">
                     <p className="font-bold">해설</p>
                     <p>{quizData.hint}</p>
                  </div>
               )}
            </div>
         </form>
      </article>
   )
}
