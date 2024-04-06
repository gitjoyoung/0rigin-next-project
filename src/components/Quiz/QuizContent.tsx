'use client'

import { QuizData } from '@/types/quizTypes'
import { Disclosure } from '@headlessui/react'
import { CheckBadgeIcon, ChevronUpIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'

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
         <h1 className="font-bold text-3xl">{curIndex}.</h1>
         <h1 className="font-bold text-xl break-words">{quizData.question}</h1>
         <div>
            <Disclosure>
               {({ open }) => (
                  <>
                     <Disclosure.Button
                        className="flex w-full gap-3  bg-yellow-100 px-4 py-2 text-left text-sm font-medium
                         text-yellow-600 hover:bg-yellow-200 focus:outline-none focus-visible:ring focus-visible:ring-yellow-500/75"
                     >
                        <span>Hint : 힌트</span>
                        <ChevronUpIcon
                           className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 `}
                        />
                     </Disclosure.Button>
                     <Disclosure.Panel className="px-2 pb-4 pt-4 text-xs text-gray-500 border border-t-0 ">
                        <p className="flex flex-col gap-3 font-semibold  ">
                           {quizData.hint}
                        </p>
                     </Disclosure.Panel>
                  </>
               )}
            </Disclosure>
         </div>
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
               <button type="submit" className="p-2 px-5">
                  제출하기
               </button>
            </div>
         </form>
      </article>
   )
}
