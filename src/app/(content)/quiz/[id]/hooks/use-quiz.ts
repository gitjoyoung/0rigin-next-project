import { QuizDetail } from '@/entities/quiz/types'
import { useState } from 'react'

interface UseQuizProps {
   quizData: QuizDetail
}

interface UseQuizReturn {
   quizDataLength: number
   curIndex: number
   selectedOption: string | null
   showResult: boolean
   progress: number
   currentQuestion: any
   formattedOptions: Array<{ id: string; value: string }>
   handleIndexChange: (newIndex: number) => void
   handleOptionSelect: (option: string) => void
   handleShowResult: () => void
   userAnswers: Record<number, string>
}

export function useQuiz({ quizData }: UseQuizProps): UseQuizReturn {
   const questions = quizData.questions || []
   const quizDataLength = questions.length
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

   const currentQuestion = questions[curIndex]
   const options = [
      currentQuestion?.option_1,
      currentQuestion?.option_2,
      currentQuestion?.option_3,
      currentQuestion?.option_4,
      currentQuestion?.option_5,
   ].filter((option) => option && option.trim() !== '')

   const formattedOptions = options.map((option, index) => ({
      id: (index + 1).toString(),
      value: option,
   }))

   return {
      quizDataLength,
      curIndex,
      selectedOption,
      showResult,
      progress,
      currentQuestion,
      formattedOptions,
      handleIndexChange,
      handleOptionSelect,
      handleShowResult,
      userAnswers,
   }
}
