import QuizHeader from '@/components/Quiz/QuizHeader'
import React from 'react'

export default function layout({ children }) {
   return (
      <div>
         <QuizHeader />
         <div>{children} </div>
      </div>
   )
}
