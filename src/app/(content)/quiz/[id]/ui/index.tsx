'use client'

import { Progress } from '@/shared/shadcn/ui/progress'
import { QuizData } from '@/types/quizTypes'
import { useState } from 'react'
import QuizContent from './QuizForm'
import QuizNavButton from './QuizNavButton'

interface QuizDataList {
   quizData: QuizData[]
}

export default function Quiz({ quizData }: QuizDataList) {
   const quizDataLength = quizData.length
   const [curIndex, setCurIndex] = useState(0)
   const [answerTable, setAnswerTable] = useState({})

   const handleAnswer = (selected: string) => {
      setAnswerTable((prev) => ({ ...prev, [curIndex]: selected }))
   }
   const progress =
      quizDataLength > 1 ? (curIndex / (quizDataLength - 1)) * 100 : 100

   return (
      <section>
         <Progress value={progress} className="rounded-none" />
         <div className="flex justify-center items-center gap-3 flex-wrap">
            {/* <QuizAnswerTable answerTable={answerTable} /> */}
            <div className="w-[800px]">
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
