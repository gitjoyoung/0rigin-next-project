'use client'

import { Alert, AlertDescription } from '@/shared/shadcn/ui/alert'
import { Button } from '@/shared/shadcn/ui/button'
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
} from '@/shared/shadcn/ui/card'
import { Input } from '@/shared/shadcn/ui/input'
import { Label } from '@/shared/shadcn/ui/label'
import { Switch } from '@/shared/shadcn/ui/switch'
import { Textarea } from '@/shared/shadcn/ui/textarea'
import { AlertCircle, X } from 'lucide-react'
import { useQuizCreate } from '../hook/use-quiz-create'

export default function QuizCreateForm() {
   const {
      form,
      isSubmitting,
      errors,
      submitQuiz,
      updateFormField,
      addQuestion,
      removeQuestion,
      updateQuestionField,
      addOption,
      removeOption,
      updateOptionValue,
   } = useQuizCreate()

   // 현재 선택지 개수 계산
   const getValidOptionCount = (question: any) => {
      return [
         question.option_1,
         question.option_2,
         question.option_3,
         question.option_4,
         question.option_5,
      ].filter((option) => option.trim() !== '').length
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
                     <Label htmlFor="title">퀴즈 제목 *</Label>
                     <Input
                        id="title"
                        value={form.title}
                        onChange={(e) =>
                           updateFormField('title', e.target.value)
                        }
                        placeholder="퀴즈 제목을 입력하세요"
                     />
                  </div>

                  <div className="space-y-2">
                     <Label htmlFor="description">퀴즈 설명</Label>
                     <Textarea
                        id="description"
                        value={form.description}
                        onChange={(e) =>
                           updateFormField('description', e.target.value)
                        }
                        placeholder="퀴즈 설명을 입력하세요"
                        rows={3}
                     />
                  </div>

                  <div className="flex items-center space-x-2">
                     <Switch
                        id="is_public"
                        checked={form.is_public}
                        onCheckedChange={(checked) =>
                           updateFormField('is_public', checked)
                        }
                     />
                     <Label htmlFor="is_public">공개 퀴즈</Label>
                  </div>
               </div>
            </CardContent>
         </Card>

         {form.questions.map((question, questionIndex) => {
            const validOptionCount = getValidOptionCount(question)
            return (
               <Card key={questionIndex} className="mb-6">
                  <CardHeader className="flex flex-row items-center justify-between">
                     <CardTitle>문제 {question.question_number}</CardTitle>
                     {form.questions.length > 1 && (
                        <Button
                           variant="ghost"
                           size="icon"
                           onClick={() => removeQuestion(questionIndex)}
                        >
                           <X className="h-4 w-4" />
                        </Button>
                     )}
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor={`question-${questionIndex}`}>
                           문제 제목
                        </Label>
                        <Textarea
                           id={`question-${questionIndex}`}
                           value={question.question_text}
                           onChange={(e) =>
                              updateQuestionField(
                                 questionIndex,
                                 'question_text',
                                 e.target.value,
                              )
                           }
                           placeholder="문제 제목을 입력하세요"
                           rows={2}
                        />
                     </div>

                     <div className="space-y-2">
                        <Label htmlFor={`explanation-${questionIndex}`}>
                           힌트
                        </Label>
                        <Textarea
                           id={`explanation-${questionIndex}`}
                           value={question.explanation}
                           onChange={(e) =>
                              updateQuestionField(
                                 questionIndex,
                                 'explanation',
                                 e.target.value,
                              )
                           }
                           placeholder="정답에 대한 설명을 입력하세요"
                           rows={2}
                        />
                     </div>

                     <div className="space-y-2">
                        <Label>정답 선택</Label>
                        <div className="grid grid-cols-2 gap-2">
                           {Array.from(
                              { length: question.option_count },
                              (_, i) => i + 1,
                           ).map((optionNumber) => {
                              const optionValue = question[
                                 `option_${optionNumber}` as keyof typeof question
                              ] as string
                              return (
                                 <div
                                    key={optionNumber}
                                    className="flex items-center space-x-2"
                                 >
                                    <input
                                       type="radio"
                                       name={`answer-${questionIndex}`}
                                       checked={
                                          question.correct_answer ===
                                          optionNumber
                                       }
                                       onChange={() =>
                                          updateQuestionField(
                                             questionIndex,
                                             'correct_answer',
                                             optionNumber,
                                          )
                                       }
                                       className="h-4 w-4"
                                    />
                                    <Label className="text-sm">
                                       {optionValue || `선택지 ${optionNumber}`}
                                    </Label>
                                 </div>
                              )
                           })}
                        </div>
                     </div>

                     <div className="space-y-2">
                        <div className="flex items-center justify-between">
                           <Label>선택지 (최소 2개, 최대 5개)</Label>
                           <span className="text-sm text-muted-foreground">
                              {validOptionCount}/5
                           </span>
                        </div>

                        {Array.from(
                           { length: question.option_count },
                           (_, i) => i + 1,
                        ).map((optionNumber) => (
                           <div
                              key={optionNumber}
                              className="flex items-center gap-2"
                           >
                              <Input
                                 value={
                                    question[
                                       `option_${optionNumber}` as keyof typeof question
                                    ] as string
                                 }
                                 onChange={(e) =>
                                    updateOptionValue(
                                       questionIndex,
                                       optionNumber,
                                       e.target.value,
                                    )
                                 }
                                 placeholder={`선택지 ${optionNumber}`}
                              />
                              {validOptionCount > 2 && (
                                 <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() =>
                                       removeOption(questionIndex, optionNumber)
                                    }
                                 >
                                    <X className="h-4 w-4" />
                                 </Button>
                              )}
                           </div>
                        ))}
                        {question.option_count < 5 && (
                           <Button
                              variant="outline"
                              onClick={() => addOption(questionIndex)}
                              className="w-full"
                              type="button"
                           >
                              선택지 추가
                           </Button>
                        )}
                     </div>
                  </CardContent>
               </Card>
            )
         })}

         <div className="space-y-4">
            <Button onClick={addQuestion} className="w-full" variant="outline">
               문제 추가
            </Button>

            {/* 에러 메시지 표시 */}
            {errors.length > 0 && (
               <Card className="border-destructive">
                  <CardContent className="pt-6">
                     <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                           <ul className="list-disc list-inside space-y-1">
                              {errors.map((error, index) => (
                                 <li key={index}>{error}</li>
                              ))}
                           </ul>
                        </AlertDescription>
                     </Alert>
                  </CardContent>
               </Card>
            )}

            <Button
               onClick={submitQuiz}
               className="w-full"
               disabled={isSubmitting}
            >
               {isSubmitting ? '퀴즈 생성 중...' : '퀴즈 생성'}
            </Button>
         </div>
      </div>
   )
}
