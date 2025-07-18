'use client'

import { QuizDetail } from '@/entities/quiz'
import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from '@/shared/shadcn/ui/accordion'
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '@/shared/shadcn/ui/card'
import QuizNavButton from '@/widgets/quiz/ui/quiz-nav-button'
import QuizRadioButtonGroup from '@/widgets/quiz/ui/quiz-radio-button-group'
import QuizResult from '@/widgets/quiz/ui/quiz-result'
import { FileQuestion } from 'lucide-react'
import { useQuiz } from '../hooks/use-quiz'

export default function Quiz({ quizData }: { quizData: QuizDetail }) {
   const {
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
   } = useQuiz({ quizData })

   if (showResult) {
      return (
         <QuizResult
            totalQuestions={quizDataLength}
            userAnswers={userAnswers}
            questions={quizData.questions}
         />
      )
   }

   if (quizDataLength === 0) {
      return (
         <Card>
            <CardContent className="pt-6">
               <div className="text-center">
                  <p className="text-muted-foreground">
                     이 퀴즈에는 문제가 없습니다.
                  </p>
               </div>
            </CardContent>
         </Card>
      )
   }

   if (!currentQuestion) {
      return (
         <Card>
            <CardContent className="pt-6">
               <div className="text-center">
                  <p className="text-muted-foreground">
                     문제를 불러올 수 없습니다.
                  </p>
               </div>
            </CardContent>
         </Card>
      )
   }

   return (
      <section className="flex flex-col justify-center w-full gap-3 ">
         {/* 진행 상황 표시 */}
         <Card className="font-noto rounded-none ">
            <div className="relative">
               <div className="w-full h-5 bg-gray-200 dark:bg-gray-700 rounded-none overflow-hidden">
                  <div
                     className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 transition-all duration-300 ease-out"
                     style={{ width: `${progress}%` }}
                  />
               </div>
               <div className="flex justify-center items-center py-2 absolute top-0 left-0 w-full h-full z-10 ">
                  <p className="text-xs font-semibold text-white drop-shadow-sm">
                     {curIndex + 1} / {quizDataLength}
                  </p>
               </div>
            </div>

            <CardHeader>
               <CardTitle className="leading-relaxed">
                  {curIndex + 1}. {currentQuestion.question_text}
               </CardTitle>
               {currentQuestion.explanation && (
                  <CardDescription>
                     <Accordion type="single" collapsible className="w-full ">
                        <AccordionItem value="item-1">
                           <AccordionTrigger>
                              <div className="flex items-center gap-2">
                                 <FileQuestion size={20} />
                                 <p>힌트 보기</p>
                              </div>
                           </AccordionTrigger>
                           <AccordionContent>
                              {currentQuestion.explanation}
                           </AccordionContent>
                        </AccordionItem>
                     </Accordion>
                  </CardDescription>
               )}
            </CardHeader>
            <CardContent>
               <QuizRadioButtonGroup
                  question={currentQuestion}
                  selectedOption={selectedOption}
                  onSelect={handleOptionSelect}
               />
            </CardContent>
         </Card>
         <QuizNavButton
            curIndex={curIndex}
            setCurIndex={handleIndexChange}
            quizDataLength={quizDataLength}
            onShowResult={handleShowResult}
         />
      </section>
   )
}
