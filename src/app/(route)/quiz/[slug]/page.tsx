import Quiz from '@/components/Quiz/Quiz'
import { QUIZ_DATA } from '@/constants/quiz/quizData'
import React from 'react'

export default function page({ params }) {
   const { slug } = params
   const quiz = QUIZ_DATA.find((q) => q.path === slug)
   return (
      <div>
         <Quiz quizData={quiz.data} />
      </div>
   )
}
