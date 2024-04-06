'use client'

import { useState } from 'react'
import { QuizData } from '@/types/quizTypes'
import QuizContent from './QuizContent'
import QuizNavButton from './QuizNavButton'

interface QuizDataList {
   quizData: QuizData[]
}

export default function Quiz({ quizData }: QuizDataList) {
   const [curIndex, setCurIndex] = useState(0)
   const quizDataLength = quizData.length
   return (
      <section>
         <QuizContent quizData={quizData[curIndex]} curIndex={curIndex} />
         <QuizNavButton
            curIndex={curIndex}
            setCurIndex={setCurIndex}
            quizDataLength={quizDataLength}
         />
      </section>
   )
}
