'use client'

import { QuizData } from '@/types/quizTypes'
import { CheckBadgeIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'
import CustomDisclosure from '../common/CustomDisclosure'

interface Props {
   quizData?: QuizData
   curIndex?: number
}
export default function QuizContent({ quizData, curIndex }: Props) {
   const [isCorrect, setIsCorrect] = useState(false)

   useEffect(() => {
      setIsCorrect(false)
      const selectedInput = document.querySelector(
         'input[type="radio"]:checked',
      ) as HTMLInputElement
      if (selectedInput) {
         selectedInput.checked = false
      }
   }, [curIndex])

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      const option = formData.get('option')
      if (option === quizData.answer) {
         setIsCorrect(true)
      } else {
         console.log('wrong')
      }
   }

   return (
      <article className="border max-w-xl px-4  sm:mx-auto mx-2 my-3 py-4 gap-3 flex flex-col">
         <h1 className="font-bold text-3xl">{curIndex + 1}.</h1>
         <h1 className="font-bold text-xl break-words">{quizData.question}</h1>

         <CustomDisclosure title="힌트" tip={quizData.hint} color="yellow" />
         <form onSubmit={handleSubmit} className="flex flex-col ">
            <div className="flex-col flex text-xl  gap-1 my-2 justify-center ">
               {quizData.options.map(({ id, value }, index) => (
                  <label
                     className="border p-2 text-sm flex items-center"
                     htmlFor={id}
                     key={id}
                  >
                     <input
                        className="mr-2"
                        type="radio"
                        id={id}
                        name="option"
                        value={id}
                        disabled={isCorrect}
                     />
                     {`${index + 1} . ${value}`}
                     {isCorrect && quizData.answer === id && (
                        <CheckBadgeIcon
                           className={` h-5 w-5 text-green-500 mx-2`}
                        />
                     )}
                  </label>
               ))}
            </div>
            <div className="flex justify-center my-4">
               <button type="submit" className="p-2 px-5 " disabled={isCorrect}>
                  제출하기
               </button>
            </div>
         </form>
      </article>
   )
}
