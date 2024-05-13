'use client'

import { QuizData } from '@/types/quizTypes'
import { useEffect, useState } from 'react'
import CustomDisclosure from '../common/CustomDisclosure'
import QuizSubject from './QuizSubject'
import QuizSubmit from './QuizSubmit'
import QuizRadioButtonGroup from './QuizRadioButtonGroup'

interface Props {
   quizData?: QuizData
   curIndex?: number
   handleAnswer?: (selected: string) => void
}
export default function QuizContent({
   quizData,
   curIndex,
   handleAnswer,
}: Props) {
   const [isCorrect, setIsCorrect] = useState<boolean>(false)
   const initialOptions = {
      option1: false,
      option2: false,
      option3: false,
      option4: false,
   }
   const [selectedOption, setSelectedOption] = useState(initialOptions)
   const { options, answer } = quizData

   useEffect(() => {
      setSelectedOption(initialOptions)
      setIsCorrect(false)
   }, [curIndex])

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const selected = e.currentTarget.option.value
      if (selected === '') return

      const optionData = {
         ...selectedOption,
         [selected]: true,
      }
      setSelectedOption(optionData) // 선택한 옵션 ID 저장
      if (selected === answer) {
         setIsCorrect(true) // 정답 여부 판별
      }
      handleAnswer(selected) // 정답 테이블에 저장
   }

   return (
      <article className="border max-w-xl px-4  sm:mx-auto mx-2 my-3 py-4 gap-3 flex flex-col">
         <QuizSubject index={curIndex + 1} question={quizData.question} />
         <CustomDisclosure title="힌트" text={quizData.hint} />
         <form onSubmit={handleSubmit} className="flex flex-col ">
            {/* 문제 */}

            <QuizRadioButtonGroup
               questions={options}
               answer={answer}
               isCorrect={isCorrect}
               selectedOption={selectedOption}
            />

            {/* 제출버튼 */}
            <QuizSubmit isCorrect={isCorrect} />
         </form>
      </article>
   )
}
