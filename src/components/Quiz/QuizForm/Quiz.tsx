'use client'

import { useState } from 'react'
import { QuizData } from '@/types/quizTypes'
import QuizContent from './QuizForm'
import QuizNavButton from './QuizNavButton'
import QuizAnswerTable from './QuizAnswerTable'
import QuizProgressbar from './QuizProgressbar'

interface QuizDataList {
   quizData: QuizData[]
}

export default function Quiz({ quizData }: QuizDataList) {
   const [curIndex, setCurIndex] = useState(0)
   const [answerTable, setAnswerTable] = useState({})
   const quizDataLength = quizData.length
   const handleAnswer = (selected: string) => {
      setAnswerTable((prev) => ({ ...prev, [curIndex]: selected }))
   }

   return (
      <section>
         <QuizProgressbar value={curIndex + 1} max={quizDataLength} />
         <div className="flex justify-center items-center gap-3 flex-wrap">
            {/* <QuizAnswerTable answerTable={answerTable} /> */}
            <div className="w-[600px]">
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
         </div>
      </section>
   )
}
