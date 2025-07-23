'use client'

import { Card, CardContent } from '@/shared/shadcn/ui/card'
import { Input } from '@/shared/shadcn/ui/input'
import { Label } from '@/shared/shadcn/ui/label'
import { RadioGroup, RadioGroupItem } from '@/shared/shadcn/ui/radio-group'
import { Textarea } from '@/shared/shadcn/ui/textarea'
import { useEffect, useRef } from 'react'
import { QuestionFormProps } from '../types/quiz-form-types'
import { QuestionActions } from './question-actions'

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
   const questionTextRef = useRef<HTMLInputElement>(null)
   const option1Ref = useRef<HTMLInputElement>(null)
   const option2Ref = useRef<HTMLInputElement>(null)
   const option3Ref = useRef<HTMLInputElement>(null)
   const option4Ref = useRef<HTMLInputElement>(null)
   const explanationRef = useRef<HTMLTextAreaElement>(null)

   useEffect(() => {
      if (questionTextRef.current)
         questionTextRef.current.value = question.question_text
      if (option1Ref.current) option1Ref.current.value = question.option_1
      if (option2Ref.current) option2Ref.current.value = question.option_2
      if (option3Ref.current) option3Ref.current.value = question.option_3 || ''
      if (option4Ref.current) option4Ref.current.value = question.option_4 || ''
      if (explanationRef.current)
         explanationRef.current.value = question.explanation || ''
   }, [question])

   const handleInputChange = () => {
      onUpdate(index, {
         question_text: questionTextRef.current?.value || '',
         option_1: option1Ref.current?.value || '',
         option_2: option2Ref.current?.value || '',
         option_3: option3Ref.current?.value || '',
         option_4: option4Ref.current?.value || '',
         explanation: explanationRef.current?.value || '',
         correct_answer: question.correct_answer,
      })
   }

   const handleCorrectAnswerChange = (value: string) => {
      onUpdate(index, { ...question, correct_answer: parseInt(value) })
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
                  <Input
                     ref={questionTextRef}
                     placeholder={`질문 ${index + 1}`}
                     className="border-gray-200"
                     onChange={handleInputChange}
                  />
               </div>

               <div className="space-y-3">
                  {[1, 2, 3, 4].map((optionNum) => {
                     const optionRef = [
                        option1Ref,
                        option2Ref,
                        option3Ref,
                        option4Ref,
                     ][optionNum - 1]
                     const optionValue = question[
                        `option_${optionNum}` as keyof typeof question
                     ] as string

                     return (
                        <div
                           key={optionNum}
                           className="flex items-center gap-3"
                        >
                           <Label className="text-purple-600 font-semibold text-sm px-2 py-1 bg-purple-50 rounded">
                              A{optionNum}
                           </Label>
                           <Input
                              ref={optionRef}
                              placeholder={`답 ${optionNum}`}
                              className="border-gray-200 flex-1"
                              onChange={handleInputChange}
                           />
                           <RadioGroup
                              onValueChange={handleCorrectAnswerChange}
                              value={question.correct_answer.toString()}
                           >
                              <RadioGroupItem
                                 value={optionNum.toString()}
                                 id={`correct-${index}-${optionNum}`}
                                 className="text-purple-600 border-purple-300"
                                 disabled={!optionValue}
                              />
                           </RadioGroup>
                        </div>
                     )
                  })}
               </div>

               <div>
                  <Label className="text-sm font-medium">힌트 (선택사항)</Label>
                  <Textarea
                     ref={explanationRef}
                     placeholder="힌트를 입력해주세요"
                     className="border-gray-200 mt-1"
                     rows={2}
                     onChange={handleInputChange}
                  />
               </div>
            </div>
         </CardContent>
      </Card>
   )
}
