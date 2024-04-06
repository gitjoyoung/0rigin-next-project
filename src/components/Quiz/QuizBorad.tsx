import Link from 'next/link'
import React from 'react'

export default function QuizBorad() {
   return (
      <div>
         <ul>
            <li>
               <Link href={'/quiz/1'}>철학 퀴즈</Link>
            </li>
         </ul>
      </div>
   )
}
