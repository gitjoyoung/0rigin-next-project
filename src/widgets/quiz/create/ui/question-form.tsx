'use client'

import { Card, CardContent } from '@/shared/shadcn/ui/card'
import { Input } from '@/shared/shadcn/ui/input'
import { Label } from '@/shared/shadcn/ui/label'
import { RadioGroup, RadioGroupItem } from '@/shared/shadcn/ui/radio-group'
import { Textarea } from '@/shared/shadcn/ui/textarea'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { QuestionFormProps } from '../types/quiz-form-types'
import { QuestionActions } from './question-actions'

interface QuestionFormData {
   question_text: string
   option_1: string
   option_2: string
   option_3: string
   option_4: string
   explanation: string
   correct_answer: number
}

export function QuestionForm({
   question,
   index,
   onUpdate,
   onMoveUp,
   onMoveDown,
   onRemove,
   canMoveUp = false,
   canMoveDown = false,
   canRemove = false,
}: QuestionFormProps) {
   const {
      control,
      handleSubmit,
      setValue,
      watch,
      formState: { isDirty },
   } = useForm<QuestionFormData>({
      defaultValues: {
         question_text: question.question_text,
         option_1: question.option_1,
         option_2: question.option_2,
         option_3: question.option_3 || '',
         option_4: question.option_4 || '',
         explanation: question.explanation || '',
         correct_answer: question.correct_answer,
      },
      mode: 'onChange',
   })

   // question prop이 변경되면 폼 값 업데이트
   useEffect(() => {
      setValue('question_text', question.question_text)
      setValue('option_1', question.option_1)
      setValue('option_2', question.option_2)
      setValue('option_3', question.option_3 || '')
      setValue('option_4', question.option_4 || '')
      setValue('explanation', question.explanation || '')
      setValue('correct_answer', question.correct_answer)
   }, [question, setValue])

   // 폼 값이 변경될 때마다 부모 컴포넌트에 업데이트
   const watchedValues = watch()
   useEffect(() => {
      if (isDirty) {
         onUpdate(index, watchedValues)
      }
   }, [watchedValues, onUpdate, index, isDirty])

   const handleCorrectAnswerChange = (value: string) => {
      setValue('correct_answer', parseInt(value))
   }

   return (
      <Card className="mb-4 border-2 border-gray-100">
         <CardContent className="p-6">
            <div className="space-y-4">
               <div className="space-y-2">
                  <div className="flex items-center gap-3">
                     <Label className="text-purple-600 font-semibold text-sm px-2 py-1 bg-purple-50 rounded">
                        Q{index + 1}
                     </Label>
                     <QuestionActions
                        canMoveUp={canMoveUp}
                        canMoveDown={canMoveDown}
                        canRemove={canRemove}
                        onMoveUp={onMoveUp}
                        onMoveDown={onMoveDown}
                        onRemove={onRemove}
                     />
                  </div>
                  <Controller
                     name="question_text"
                     control={control}
                     render={({ field }) => (
                        <Input
                           {...field}
                           placeholder={`질문 ${index + 1}`}
                           className="border-gray-200"
                        />
                     )}
                  />
               </div>

               <div className="space-y-3">
                  {(() => {
                     const options = [
                        { num: 1, value: watchedValues.option_1 },
                        { num: 2, value: watchedValues.option_2 },
                        { num: 3, value: watchedValues.option_3 },
                        { num: 4, value: watchedValues.option_4 },
                     ].filter(
                        (option) => option.value && option.value.trim() !== '',
                     )

                     return options.map(({ num }) => (
                        <div key={num} className="flex items-center gap-3">
                           <Label className="text-purple-600 font-semibold text-sm px-2 py-1 bg-purple-50 rounded">
                              A{num}
                           </Label>
                           <Controller
                              name={`option_${num}` as keyof QuestionFormData}
                              control={control}
                              render={({ field }) => (
                                 <Input
                                    {...field}
                                    placeholder={`답 ${num}`}
                                    className="border-gray-200 flex-1"
                                 />
                              )}
                           />
                           <Controller
                              name="correct_answer"
                              control={control}
                              render={({ field }) => (
                                 <RadioGroup
                                    onValueChange={handleCorrectAnswerChange}
                                    value={field.value.toString()}
                                 >
                                    <RadioGroupItem
                                       value={num.toString()}
                                       id={`correct-${index}-${num}`}
                                       className="text-purple-600 border-purple-300"
                                       disabled={
                                          !watchedValues[
                                             `option_${num}` as keyof QuestionFormData
                                          ]
                                       }
                                    />
                                 </RadioGroup>
                              )}
                           />
                        </div>
                     ))
                  })()}
               </div>

               <div>
                  <Label className="text-sm font-medium">힌트 (선택사항)</Label>
                  <Controller
                     name="explanation"
                     control={control}
                     render={({ field }) => (
                        <Textarea
                           {...field}
                           placeholder="힌트를 입력해주세요"
                           className="border-gray-200 mt-1"
                           rows={2}
                        />
                     )}
                  />
               </div>
            </div>
         </CardContent>
      </Card>
   )
}
