import QuizTitle from '@/components/Quiz/QuizTitle'
import React from 'react'

export default function layout({ children }) {
   return (
      <div>
         <QuizTitle />
         <div>{children} </div>
      </div>
   )
}
