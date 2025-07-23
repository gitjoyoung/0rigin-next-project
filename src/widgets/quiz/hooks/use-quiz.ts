import { QuizDetail } from '@/entities/quiz'
import { useState } from 'react'

interface QuizState {
   currentIndex: number
   userAnswers: Record<number, string>
   showResult: boolean
}

interface UseQuizProps {
   quizData: QuizDetail | null
}

export function useQuiz({ quizData }: UseQuizProps) {
   // null 체크 및 기본값 설정
   const questions = quizData?.questions || []
   const quizDataLength = questions.length

   // 통합된 퀴즈 상태
   const [quizState, setQuizState] = useState<QuizState>({
      currentIndex: 0,
      userAnswers: {},
      showResult: false,
   })

   // 현재 문제
   const currentQuestion = questions[quizState.currentIndex] || null

   // 현재 선택된 옵션
   const selectedOption = quizState.userAnswers[quizState.currentIndex] || ''

   // 진행률 계산
   const progress =
      quizDataLength > 0
         ? ((quizState.currentIndex + 1) / quizDataLength) * 100
         : 0

   // 인덱스 변경 핸들러
   const handleIndexChange = (newIndex: number) => {
      if (newIndex >= 0 && newIndex < quizDataLength) {
         setQuizState((prev) => ({
            ...prev,
            currentIndex: newIndex,
         }))
      }
   }

   // 옵션 선택 핸들러
   const handleOptionSelect = (optionValue: string) => {
      setQuizState((prev) => ({
         ...prev,
         userAnswers: {
            ...prev.userAnswers,
            [prev.currentIndex]: optionValue,
         },
      }))
   }

   // 결과 표시 핸들러
   const handleShowResult = () => {
      setQuizState((prev) => ({
         ...prev,
         showResult: true,
      }))
   }

   return {
      quizDataLength,
      curIndex: quizState.currentIndex,
      selectedOption,
      showResult: quizState.showResult,
      progress,
      currentQuestion,
      handleIndexChange,
      handleOptionSelect,
      handleShowResult,
      userAnswers: quizState.userAnswers,
   }
}
