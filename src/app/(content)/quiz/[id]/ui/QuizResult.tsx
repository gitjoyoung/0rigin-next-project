'use client'

import { QuizQuestion } from '@/entities/quiz/types'
import { Badge } from '@/shared/shadcn/ui/badge'
import { Button } from '@/shared/shadcn/ui/button'
import { Card, CardContent, CardHeader } from '@/shared/shadcn/ui/card'
import { Progress } from '@/shared/shadcn/ui/progress'
import { Icons } from '@/shared/ui/icons'
import { useEffect, useState } from 'react'

interface Props {
   totalQuestions: number
   userAnswers: Record<number, string>
   questions: QuizQuestion[]
}

export default function QuizResult({
   totalQuestions,
   userAnswers,
   questions,
}: Props) {
   // 정답 개수 계산
   const correctAnswers = Object.entries(userAnswers).reduce(
      (count, [index, answer]) => {
         const question = questions[Number(index)]
         return question?.correct_answer.toString() === answer
            ? count + 1
            : count
      },
      0,
   )

   const percentage = Math.round((correctAnswers / totalQuestions) * 100)
   const incorrectAnswers = totalQuestions - correctAnswers
   const [animatedPercentage, setAnimatedPercentage] = useState(0)

   // 점수 카운트업 애니메이션
   useEffect(() => {
      const duration = 2000 // 2초
      const steps = 60 // 60 프레임
      const increment = percentage / steps
      let currentStep = 0

      const timer = setInterval(() => {
         currentStep++
         if (currentStep <= steps) {
            setAnimatedPercentage(Math.round(increment * currentStep))
         } else {
            setAnimatedPercentage(percentage)
            clearInterval(timer)
         }
      }, duration / steps)

      return () => clearInterval(timer)
   }, [percentage])

   const getResultData = () => {
      if (percentage >= 90)
         return {
            message: '완벽해요!',
            emoji: '🎉',
            color: 'from-emerald-500 to-green-600',
            textColor: 'text-emerald-600',
            bgColor: 'bg-emerald-50 dark:bg-emerald-950',
         }
      if (percentage >= 70)
         return {
            message: '잘했어요!',
            emoji: '👏',
            color: 'from-blue-500 to-indigo-600',
            textColor: 'text-blue-600',
            bgColor: 'bg-blue-50 dark:bg-blue-950',
         }
      if (percentage >= 50)
         return {
            message: '좋아요!',
            emoji: '👍',
            color: 'from-yellow-500 to-amber-600',
            textColor: 'text-yellow-600',
            bgColor: 'bg-yellow-50 dark:bg-yellow-950',
         }
      return {
         message: '다시 도전해보세요!',
         emoji: '💪',
         color: 'from-rose-500 to-red-600',
         textColor: 'text-rose-600',
         bgColor: 'bg-rose-50 dark:bg-rose-950',
      }
   }

   const resultData = getResultData()

   return (
      <div className="h-full flex items-center justify-center ">
         <div className="w-full max-w-2xl animate-in fade-in-0 duration-700 slide-in-from-bottom-4">
            <Card className="overflow-hidden border-0 shadow-2xl">
               {/* 헤더 그라데이션 - 높이 증가 */}
               <div className={`h-32 bg-gradient-to-br ${resultData.color} `}>
                  <div className="relative h-full flex items-center justify-center animate-in fade-in-0 slide-in-from-top-4 duration-500 delay-200">
                     <div className="text-center flex gap-3 items-center text-white">
                        <div className="text-5xl mb-3 ">{resultData.emoji}</div>
                        <h1 className="text-2xl font-bold">퀴즈 결과!</h1>
                     </div>
                  </div>
               </div>

               <CardHeader className="pb-6">
                  {/* 작은 정답/오답 통계 - 상단 */}
                  <div className="flex justify-center gap-4 mb-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-200">
                     <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950 px-3 py-2 rounded-full">
                        <Icons.check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                           정답 {correctAnswers}
                        </span>
                     </div>
                     <div className="flex items-center gap-2 bg-rose-50 dark:bg-rose-950 px-3 py-2 rounded-full">
                        <Icons.x className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                        <span className="text-sm font-medium text-rose-600 dark:text-rose-400">
                           오답 {incorrectAnswers}
                        </span>
                     </div>
                  </div>

                  <div className="text-center animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-300">
                     <div
                        className={`text-6xl font-black mb-4 ${resultData.textColor} transition-all duration-300`}
                     >
                        {animatedPercentage}%
                     </div>
                     <Badge
                        variant="secondary"
                        className="text-base px-6 py-2 mb-2"
                     >
                        {resultData.message}
                     </Badge>
                     <p className="text-muted-foreground">
                        {correctAnswers}/{totalQuestions}를 맞췄다
                     </p>
                  </div>
               </CardHeader>

               <CardContent className="space-y-8 pb-8">
                  {/* 프로그레스 바 */}
                  <div className="space-y-3 animate-in fade-in-0 slide-in-from-left-4 duration-700 delay-500">
                     <div className="flex justify-between text-sm font-medium">
                        <span>정답률</span>
                        <span>{animatedPercentage}%</span>
                     </div>
                     <div className="relative">
                        <Progress value={animatedPercentage} className="h-4" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse rounded-full" />
                     </div>
                  </div>

                  <hr className="border-border" />

                  {/* 목록으로 버튼만 */}
                  <div className="flex justify-center animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-800">
                     <Button
                        variant="outline"
                        size="lg"
                        className="h-12 text-base font-semibold hover:scale-105 transition-transform"
                        onClick={() => window.history.back()}
                     >
                        <Icons.arrowLeft className="w-5 h-5 mr-2" />
                        목록으로
                     </Button>
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
   )
}
