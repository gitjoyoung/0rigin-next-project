'use client'

import { v4 as uuid } from 'uuid'
import { QUIZ_DATA } from '@/constants/quiz/quizData'
import React from 'react'
import Link from 'next/link'

export default function QuizBoard() {
   return (
      <div className="border p-3">
         <ul className="grid sm:grid-cols-4 gap-3 ">
            {QUIZ_DATA.map((item) => (
               <Link
                  type="button"
                  key={uuid()}
                  className="shadow-md rounded-md text-center  p-5 border"
                  href={`/quiz/${item.path}`}
               >
                  {item.name}
               </Link>
            ))}
         </ul>
      </div>
   )
}
