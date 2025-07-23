'use client'

import { Button } from '@/shared/shadcn/ui/button'
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '@/shared/shadcn/ui/card'
import { Input } from '@/shared/shadcn/ui/input'
import { Label } from '@/shared/shadcn/ui/label'
import { Textarea } from '@/shared/shadcn/ui/textarea'
import { useEffect, useMemo, useRef } from 'react'
import { QuizFormData } from '../types/quiz-form-types'
import { QuizTitleInput } from './quiz-title-input'

interface BasicInfoFormProps {
   formData: QuizFormData
   onSubmit: (data: QuizFormData) => void
   onFormDataChange: (data: QuizFormData) => void
}

export function BasicInfoForm({
   formData,
   onSubmit,
   onFormDataChange,
}: BasicInfoFormProps) {
   const descriptionRef = useRef<HTMLTextAreaElement>(null)
   const questionCountRef = useRef<HTMLInputElement>(null)
   const passScoreRef = useRef<HTMLInputElement>(null)

   const refs = useMemo(
      () => ({
         description: descriptionRef,
         questionCount: questionCountRef,
         passScore: passScoreRef,
      }),
      [],
   )

   useEffect(() => {
      const { description, questionCount, passScore } = refs
      if (description.current)
         description.current.value = formData.description || ''
      if (questionCount.current)
         questionCount.current.value = formData.questionCount.toString()
      if (passScore.current)
         passScore.current.value = formData.pass_score.toString()
   }, [formData, refs])

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      const { description, questionCount, passScore } = refs
      onSubmit({
         title: formData.title,
         description: description.current?.value || '',
         questionCount: parseInt(questionCount.current?.value || '1'),
         pass_score: parseInt(passScore.current?.value || '60'),
      })
   }

   return (
      <div className="max-w-2xl mx-auto p-6 space-y-6">
         <div className="text-center">
            <h1 className="text-3xl font-bold">퀴즈 만들기</h1>
            <p className="text-muted-foreground mt-2">
               퀴즈의 기본 정보를 설정해주세요
            </p>
         </div>

         <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
               <CardHeader>
                  <CardTitle>퀴즈 기본 정보</CardTitle>
                  <CardDescription>
                     퀴즈의 제목, 설명, 문제 개수를 설정해주세요
                  </CardDescription>
               </CardHeader>
               <CardContent className="space-y-4">
                  <QuizTitleInput
                     value={formData.title}
                     onChange={(title) =>
                        onFormDataChange({ ...formData, title })
                     }
                  />

                  <div>
                     <Label>퀴즈 설명 (선택사항)</Label>
                     <Textarea
                        ref={refs.description}
                        placeholder="퀴즈에 대한 설명을 입력해주세요"
                        className="mt-1"
                     />
                  </div>

                  <div>
                     <Label>문제 개수</Label>
                     <Input
                        ref={refs.questionCount}
                        type="number"
                        min="1"
                        max="20"
                        placeholder="문제 개수를 입력해주세요"
                        className="mt-1"
                     />
                  </div>

                  <div>
                     <Label>합격 점수 (%)</Label>
                     <Input
                        ref={refs.passScore}
                        type="number"
                        min="1"
                        max="100"
                        className="mt-1"
                     />
                  </div>
               </CardContent>
            </Card>

            <div className="flex justify-end">
               <Button type="submit" className="min-w-[120px]">
                  다음 단계
               </Button>
            </div>
         </form>
      </div>
   )
}
