'use client'

import { useState } from 'react'
import { QuizData } from '@/types/quizTypes'
import QuizContent from './QuizInput'
import QuizNavButton from './QuizNavButton'
import QuizAnswerTable from './QuizAnswerTable'

interface QuizDataList {
   quizData: QuizData[]
}

export default function Quiz({ quizData }: QuizDataList) {
   const [curIndex, setCurIndex] = useState(0)
   const quizDataLength = quizData.length
   const [answerTable, setAnswerTable] = useState({
      0: 1,
      1: 2,
   })
   const handleAnswer = (selected: string) => {
      setAnswerTable((prev) => ({ ...prev, [curIndex]: selected }))
   }

   return (
      <section className="flex flex-wrap justify-between">
         <div>
            <QuizAnswerTable answerTable={answerTable} />
         </div>
         <div className="flex-1 min-w-[300px]">
            <QuizContent
               handleAnswer={handleAnswer}
               quizData={quizData[curIndex]}
               curIndex={curIndex}
            />
            <QuizNavButton
               curIndex={curIndex}
               setCurIndex={setCurIndex}
               quizDataLength={quizDataLength}
            />
         </div>
      </section>
   )
}
