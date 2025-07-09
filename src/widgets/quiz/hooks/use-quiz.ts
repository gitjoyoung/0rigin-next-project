import { QuizDetail } from '@/entities/quiz/api/quiz-api'
import { useState } from 'react'

interface UseQuizProps {
   quizData: QuizDetail | null
}

export function useQuiz({ quizData }: UseQuizProps) {
   // null 체크 및 기본값 설정
   const questions = quizData?.questions || []
   const quizDataLength = questions.length

   const [curIndex, setCurIndex] = useState(0)
   const [userAnswers, setUserAnswers] = useState<Record<number, string>>({})
   const [showResult, setShowResult] = useState(false)

   // 현재 문제
   const currentQuestion = questions[curIndex] || null

   // 현재 선택된 옵션
   const selectedOption = userAnswers[curIndex] || ''

   // 진행률 계산
   const progress =
      quizDataLength > 0 ? ((curIndex + 1) / quizDataLength) * 100 : 0

   // 인덱스 변경 핸들러
   const handleIndexChange = (newIndex: number) => {
      if (newIndex >= 0 && newIndex < quizDataLength) {
         setCurIndex(newIndex)
      }
   }

   // 옵션 선택 핸들러
   const handleOptionSelect = (optionValue: string) => {
      setUserAnswers((prev) => ({
         ...prev,
         [curIndex]: optionValue,
      }))
   }

   // 결과 표시 핸들러
   const handleShowResult = () => {
      setShowResult(true)
   }

   return {
      quizDataLength,
      curIndex,
      selectedOption,
      showResult,
      progress,
      currentQuestion,
      handleIndexChange,
      handleOptionSelect,
      handleShowResult,
      userAnswers,
   }
}
