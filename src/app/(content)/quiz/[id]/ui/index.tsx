'use client'

import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from '@/shared/shadcn/ui/accordion'
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '@/shared/shadcn/ui/card'
import { Progress } from '@/shared/shadcn/ui/progress'
import { Icons } from '@/shared/ui/icons'
import { useState } from 'react'
import { IQuizData } from '../types/quiz-type'
import QuizNavButton from './QuizNavButton'
import QuizRadioButtonGroup from './QuizRadioButtonGroup'
import QuizResult from './QuizResult'

export default function Quiz({ quizData }: { quizData: IQuizData[] }) {
   const quizDataLength = quizData.length
   const [curIndex, setCurIndex] = useState(0)
   const [selectedOption, setSelectedOption] = useState<string | null>(null)
   const [userAnswers, setUserAnswers] = useState<Record<number, string>>({})
   const [showResult, setShowResult] = useState(false)

   const progress =
      quizDataLength > 1 ? (curIndex / (quizDataLength - 1)) * 100 : 100

   const handleIndexChange = (newIndex: number) => {
      // 현재 선택된 답안 저장
      if (selectedOption !== null) {
         setUserAnswers((prev) => ({
            ...prev,
            [curIndex]: selectedOption,
         }))
      }

      // 새 인덱스로 이동하고 해당 인덱스의 답안 불러오기
      setSelectedOption(userAnswers[newIndex] || null)
      setCurIndex(newIndex)
   }

   const handleOptionSelect = (option: string) => {
      setSelectedOption(option)
      setUserAnswers((prev) => ({
         ...prev,
         [curIndex]: option,
      }))
   }

   const handleShowResult = () => {
      // 마지막 답안 저장
      if (selectedOption !== null) {
         setUserAnswers((prev) => ({
            ...prev,
            [curIndex]: selectedOption,
         }))
      }
      setShowResult(true)
   }

   // 정답 개수 계산
   const correctAnswers = Object.entries(userAnswers).reduce(
      (count, [index, answer]) => {
         return quizData[Number(index)]?.answer === answer ? count + 1 : count
      },
      0,
   )

   if (showResult) {
      return (
         <QuizResult
            totalQuestions={quizDataLength}
            correctAnswers={correctAnswers}
         />
      )
   }

   return (
      <section className="flex flex-col justify-center w-full gap-3 ">
         <Progress className="rounded-none" value={progress} />
         <Card className="font-noto ">
            <CardHeader>
               <CardTitle className="leading-relaxed">
                  {curIndex + 1}. {quizData[curIndex].question}
               </CardTitle>
               <CardDescription>
                  <Accordion type="single" collapsible className="w-full ">
                     <AccordionItem value="item-1">
                        <AccordionTrigger>
                           <div className="flex items-center gap-2">
                              <Icons.fileQuestion size={20} />
                              <p>힌트 보기</p>
                           </div>
                        </AccordionTrigger>
                        <AccordionContent>
                           {quizData[curIndex].hint}
                        </AccordionContent>
                     </AccordionItem>
                  </Accordion>
               </CardDescription>
            </CardHeader>
            <CardContent>
               <QuizRadioButtonGroup
                  questions={quizData[curIndex].options}
                  answer={quizData[curIndex].answer}
                  selectedOption={selectedOption}
                  onSelect={handleOptionSelect}
               />
            </CardContent>
         </Card>
         <QuizNavButton
            curIndex={curIndex}
            setCurIndex={handleIndexChange}
            quizDataLength={quizDataLength}
            onShowResult={handleShowResult}
         />
      </section>
   )
}
