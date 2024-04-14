'use client'

import { QUIZ_DATA } from '@/constants/quiz/quizData'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function QuizBorad() {
   const router = useRouter()
   return (
      <div className="border p-3">
         <ul className="grid sm:grid-cols-4 gap-3 ">
            {QUIZ_DATA.map((item) => (
               <button
                  type="button"
                  key={item.path}
                  className="shadow-md rounded-md text-center  p-5 border"
                  onClick={() => {
                     router.push(`/quiz/${item.path}`)
                  }}
               >
                  {item.name}
               </button>
            ))}
         </ul>
      </div>
   )
}
