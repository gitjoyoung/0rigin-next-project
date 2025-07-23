'use client'

import { Button } from '@/shared/shadcn/ui/button'
import { Loader2 } from 'lucide-react'
import { QuestionFormData, QuizFormData } from '../types/quiz-form-types'
import { QuestionForm } from './question-form'

interface QuestionsFormProps {
   formData: QuizFormData
   questions: QuestionFormData[]
   onUpdateQuestion: (index: number, data: QuestionFormData) => void
   onMoveQuestion: (fromIndex: number, toIndex: number) => void
   onRemoveQuestion: (index: number) => void
   onGoBack: () => void
   onSubmit: () => void
   isSubmitting: boolean
}

export function QuestionsForm({
   formData,
   questions,
   onUpdateQuestion,
   onMoveQuestion,
   onRemoveQuestion,
   onGoBack,
   onSubmit,
   isSubmitting,
}: QuestionsFormProps) {
   return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
         <div className="text-center">
            <h1 className="text-3xl font-bold">문제 작성</h1>
            <p className="text-muted-foreground mt-2">
               {formData.title} - 총 {questions.length}개 문제
            </p>
         </div>

         <div className="space-y-6">
            {questions.map((question, index) => (
               <QuestionForm
                  key={index}
                  question={question}
                  index={index}
                  onUpdate={onUpdateQuestion}
                  onMoveUp={
                     index > 0
                        ? () => onMoveQuestion(index, index - 1)
                        : undefined
                  }
                  onMoveDown={
                     index < questions.length - 1
                        ? () => onMoveQuestion(index, index + 1)
                        : undefined
                  }
                  onRemove={
                     questions.length > 1
                        ? () => onRemoveQuestion(index)
                        : undefined
                  }
                  canMoveUp={index > 0}
                  canMoveDown={index < questions.length - 1}
                  canRemove={questions.length > 1}
               />
            ))}
         </div>

         <div className="flex justify-between">
            <Button
               variant="outline"
               onClick={onGoBack}
               className="min-w-[120px]"
            >
               이전 단계
            </Button>
            <Button
               onClick={onSubmit}
               disabled={isSubmitting}
               className="min-w-[120px]"
            >
               {isSubmitting ? (
                  <>
                     <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                     생성 중...
                  </>
               ) : (
                  '퀴즈 생성하기'
               )}
            </Button>
         </div>
      </div>
   )
}
