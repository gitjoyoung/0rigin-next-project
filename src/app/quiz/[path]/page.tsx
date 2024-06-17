import Quiz from '@/components/Quiz/QuizForm/Quiz'
import { QUIZ_DATA } from '@/constants/quiz/quizData'
import React from 'react'

interface Params {
   params: {
      path: string
   }
}
export default function page({ params }: Params) {
   const { path } = params
   // 퀴즈 데이터를 나중에 서버에서 받아올 예정
   const quiz = QUIZ_DATA.find((q) => q.path === path)
   return (
      <>
         <Quiz quizData={quiz.data} />
      </>
   )
}
