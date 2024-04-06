'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

export default function QuizBorad() {
   const quiz = [
      '철학 퀴즈',
      '과학 퀴즈',
      '역사 퀴즈',
      '영어 퀴즈',
      '수학 퀴즈',
      '프로그래밍 퀴즈',
   ]
   const router = useRouter()
   return (
      <div className="border p-3">
         <ul className="grid sm:grid-cols-4 gap-3 ">
            {quiz.map((item) => (
               <button
                  type="button"
                  key={item}
                  className="shadow-md rounded-md text-center  p-5 border"
                  onClick={() => {
                     router.push(`/quiz/${item}`)
                  }}
               >
                  {item}
               </button>
            ))}
         </ul>
      </div>
   )
}
