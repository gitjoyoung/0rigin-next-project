'use client'

import React from 'react'

export default function index() {
   const questions = {
      questionTotal: 5,
      currentQuestion: 1,
      question:
         '플라톤의 이데아론에 따르면, 진정한 지식은 무엇에 대한 이해를 통해 얻어질 수 있는가?',
      options: [
         { id: 'option1', value: '감각적 대상' },
         { id: 'option2', value: '이데아' },
         { id: 'option3', value: '물질적 세계' },
         { id: 'option4', value: '개인적 경험' },
      ],
      answer: 'option2',
   }

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      const option = formData.get('option')
      const { answer } = questions
      if (option === answer) {
         console.log('correct')
      } else {
         console.log('wrong')
      }
   }
   return (
      <div className="border max-w-xl px-4  sm:mx-auto mx-2 my-3 py-4 gap-3 flex flex-col">
         <h1 className="font-semibold text-xl break-words">
            {questions.question}
         </h1>
         <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="flex-col flex text-xl gap-2 my-2">
               {questions.options.map(({ id, value }) => (
                  <label className="border p-1" htmlFor={id} key={id}>
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
         </form>
      </div>
   )
}
