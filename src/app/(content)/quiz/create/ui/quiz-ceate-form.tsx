'use client'

import { Button } from '@/shared/shadcn/ui/button'
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
} from '@/shared/shadcn/ui/card'
import { Input } from '@/shared/shadcn/ui/input'
import { Label } from '@/shared/shadcn/ui/label'
import { X } from 'lucide-react'
import { useState } from 'react'

interface IQuizForm {
   title: string
   questionCount: number
   questions: IQuizQuestion[]
}

interface IQuizQuestion {
   question: string
   options: { id: string; value: string }[]
   answer: string
   hint: string
   type: 'single' | 'multiple'
}

export default function QuizCreateForm() {
   const [form, setForm] = useState<IQuizForm>({
      title: '',
      questionCount: 1,
      questions: [
         {
            question: '',
            options: [{ id: '1', value: '' }],
            answer: '',
            hint: '',
            type: 'single',
         },
      ],
   })

   const handleAddQuestion = () => {
      setForm((prev) => ({
         ...prev,
         questions: [
            ...prev.questions,
            {
               question: '',
               options: [{ id: '1', value: '' }],
               answer: '',
               hint: '',
               type: 'single',
            },
         ],
      }))
   }

   const handleAddOption = (questionIndex: number) => {
      if (form.questions[questionIndex].options.length >= 6) return

      setForm((prev) => {
         const newQuestions = [...prev.questions]
         const currentOptions = [...newQuestions[questionIndex].options]
         const maxId = Math.max(
            ...currentOptions.map((option) => parseInt(option.id)),
            0,
         )
         const newId = (maxId + 1).toString()

         newQuestions[questionIndex] = {
            ...newQuestions[questionIndex],
            options: [
               ...currentOptions,
               {
                  id: newId,
                  value: '',
               },
            ],
         }
         return { ...prev, questions: newQuestions }
      })
   }

   const handleRemoveOption = (questionIndex: number, optionId: string) => {
      console.log('선택지 삭제')
      setForm((prev) => {
         const newQuestions = [...prev.questions]
         newQuestions[questionIndex].options = newQuestions[
            questionIndex
         ].options.filter((option) => option.id !== optionId)
         return { ...prev, questions: newQuestions }
      })
   }

   const handleQuestionChange = (index: number, value: string) => {
      setForm((prev) => {
         const newQuestions = [...prev.questions]
         newQuestions[index].question = value
         return { ...prev, questions: newQuestions }
      })
   }

   const handleOptionChange = (
      questionIndex: number,
      optionIndex: number,
      value: string,
   ) => {
      setForm((prev) => {
         const newQuestions = [...prev.questions]
         newQuestions[questionIndex].options[optionIndex].value = value
         return { ...prev, questions: newQuestions }
      })
   }

   const handleHintChange = (questionIndex: number, hint: string) => {
      setForm((prev) => {
         const newQuestions = [...prev.questions]
         newQuestions[questionIndex].hint = hint
         return { ...prev, questions: newQuestions }
      })
   }

   const handleTypeChange = (
      questionIndex: number,
      type: 'single' | 'multiple',
   ) => {
      setForm((prev) => {
         const newQuestions = [...prev.questions]
         newQuestions[questionIndex].type = type
         return { ...prev, questions: newQuestions }
      })
   }

   const handleAnswerChange = (questionIndex: number, optionId: string) => {
      setForm((prev) => {
         const newQuestions = [...prev.questions]
         const question = newQuestions[questionIndex]

         if (question.type === 'single') {
            question.answer = optionId
         } else {
            const currentAnswers = question.answer
               ? question.answer.split(',')
               : []
            const answerIndex = currentAnswers.indexOf(optionId)

            if (answerIndex === -1) {
               currentAnswers.push(optionId)
            } else {
               currentAnswers.splice(answerIndex, 1)
            }

            question.answer = currentAnswers.join(',')
         }

         return { ...prev, questions: newQuestions }
      })
   }

   return (
      <div className="p-4 max-w-3xl mx-auto">
         <Card className="mb-6">
            <CardHeader>
               <CardTitle>퀴즈 생성</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="space-y-4">
                  <div className="space-y-2">
                     <Label htmlFor="title">퀴즈 제목</Label>
                     <Input
                        id="title"
                        value={form.title}
                        onChange={(e) =>
                           setForm((prev) => ({
                              ...prev,
                              title: e.target.value,
                           }))
                        }
                        placeholder="퀴즈 제목을 입력하세요"
                     />
                  </div>

                  <div className="space-y-2">
                     <Label htmlFor="questionCount">문항 수</Label>
                     <Input
                        id="questionCount"
                        type="number"
                        value={form.questionCount}
                        onChange={(e) =>
                           setForm((prev) => ({
                              ...prev,
                              questionCount: parseInt(e.target.value),
                           }))
                        }
                        min="1"
                     />
                  </div>
               </div>
            </CardContent>
         </Card>

         {form.questions.map((question, questionIndex) => (
            <Card key={questionIndex} className="mb-6">
               <CardHeader>
                  <CardTitle>문제 {questionIndex + 1}</CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                  <div className="space-y-2">
                     <Label htmlFor={`question-${questionIndex}`}>문제</Label>
                     <Input
                        id={`question-${questionIndex}`}
                        value={question.question}
                        onChange={(e) =>
                           handleQuestionChange(questionIndex, e.target.value)
                        }
                        placeholder="문제를 입력하세요"
                     />
                  </div>

                  <div className="space-y-2">
                     <Label>정답 유형</Label>
                     <div className="flex gap-4">
                        <Button
                           variant={
                              question.type === 'single' ? 'default' : 'outline'
                           }
                           onClick={() =>
                              handleTypeChange(questionIndex, 'single')
                           }
                        >
                           단수 정답
                        </Button>
                        <Button
                           variant={
                              question.type === 'multiple'
                                 ? 'default'
                                 : 'outline'
                           }
                           onClick={() =>
                              handleTypeChange(questionIndex, 'multiple')
                           }
                        >
                           복수 정답
                        </Button>
                     </div>
                  </div>

                  <div className="space-y-2">
                     <Label htmlFor={`hint-${questionIndex}`}>힌트</Label>
                     <Input
                        id={`hint-${questionIndex}`}
                        value={question.hint}
                        onChange={(e) =>
                           handleHintChange(questionIndex, e.target.value)
                        }
                        placeholder="힌트를 입력하세요"
                     />
                  </div>

                  <div className="space-y-2">
                     <Label>선택지</Label>
                     {question.options.map((option, optionIndex) => (
                        <div
                           key={option.id}
                           className="flex items-center gap-2"
                        >
                           {question.type === 'single' ? (
                              <input
                                 type="radio"
                                 name={`answer-${questionIndex}`}
                                 checked={question.answer === option.id}
                                 onChange={() =>
                                    handleAnswerChange(questionIndex, option.id)
                                 }
                                 className="h-4 w-4"
                              />
                           ) : (
                              <input
                                 type="checkbox"
                                 checked={question.answer
                                    ?.split(',')
                                    .includes(option.id)}
                                 onChange={() =>
                                    handleAnswerChange(questionIndex, option.id)
                                 }
                                 className="h-4 w-4"
                              />
                           )}
                           <Input
                              value={option.value}
                              onChange={(e) =>
                                 handleOptionChange(
                                    questionIndex,
                                    optionIndex,
                                    e.target.value,
                                 )
                              }
                              placeholder={`선택지 ${optionIndex + 1}`}
                           />
                           <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                 handleRemoveOption(questionIndex, option.id)
                              }
                           >
                              <X className="h-4 w-4" />
                           </Button>
                        </div>
                     ))}
                     {question.options.length < 6 && (
                        <Button
                           variant="outline"
                           onClick={() => handleAddOption(questionIndex)}
                           className="w-full"
                           type="button"
                        >
                           선택지 추가
                        </Button>
                     )}
                  </div>
               </CardContent>
            </Card>
         ))}

         <Button onClick={handleAddQuestion} className="w-full">
            문제 추가
         </Button>
      </div>
   )
}
