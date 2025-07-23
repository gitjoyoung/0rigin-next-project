'use client'

import { useState } from 'react'
import { useQuizForm } from './hooks/use-quiz-form'
import { QuizFormData } from './types/quiz-form-types'
import { BasicInfoForm } from './ui/basic-info-form'
import { QuestionsForm } from './ui/questions-form'

export default function QuizCreateForm() {
   const [formData, setFormData] = useState<QuizFormData>({
      title: '',
      description: '',
      questionCount: 1,
      pass_score: 60,
   })

   const {
      step,
      questions,
      createQuizMutation,
      initializeQuestions,
      updateQuestion,
      moveQuestion,
      removeQuestion,
      goBack,
      submitQuiz,
   } = useQuizForm()

   if (step === 'basic') {
      return (
         <BasicInfoForm
            formData={formData}
            onSubmit={(data) => {
               setFormData(data)
               initializeQuestions(data.questionCount)
            }}
            onFormDataChange={setFormData}
         />
      )
   }

   return (
      <QuestionsForm
         formData={formData}
         questions={questions}
         onUpdateQuestion={updateQuestion}
         onMoveQuestion={moveQuestion}
         onRemoveQuestion={removeQuestion}
         onGoBack={goBack}
         onSubmit={() => submitQuiz(formData)}
         isSubmitting={createQuizMutation.isPending}
      />
   )
}
