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
import { cn } from '@/shared/utils/cn'
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
      console.log(
         'Quiz component - quizData.id:',
         quizData.id,
         typeof quizData.id,
      )
      return (
         <QuizResult
            quizId={quizData.id}
            totalQuestions={quizDataLength}
            userAnswers={userAnswers}
            questions={quizData.questions}
         />
      )
   }

   if (quizDataLength === 0 || !currentQuestion) {
      return (
         <Card>
            <CardContent className="pt-6">
               <div className="text-center">
                  <p className="text-muted-foreground">
                     이 퀴즈에는 문제가 없습니다. 다른 퀴즈를 선택해주세요.
                  </p>
               </div>
            </CardContent>
         </Card>
      )
   }

   return (
      <section className="flex flex-col justify-center w-full gap-3">
         <Card className="font-noto rounded-none border-0 shadow-xl bg-white dark:bg-gray-900">
            <div className="relative">
               <div className="w-full h-5 bg-gray-400 rounded-none overflow-hidden">
                  <div
                     className={cn(
                        'h-full bg-gradient-to-r from-gray-900 via-gray-700 to-gray-600 transition-all duration-500 ease-out shadow-lg',
                        progress === 100 &&
                           'from-gray-800 via-gray-600 to-gray-500 shadow-gray-500/30',
                     )}
                     style={{ width: `${progress}%` }}
                  />
               </div>
               <div className="flex justify-center items-center py-2 absolute top-0 left-0 w-full h-full z-10">
                  <p className="text-xs font-semibold text-white drop-shadow-lg">
                     {curIndex + 1} / {quizDataLength}
                  </p>
               </div>
            </div>

            <CardHeader className="pb-6">
               <CardTitle className="leading-relaxed text-gray-800 dark:text-gray-100 text-lg font-bold">
                  {curIndex + 1}. {currentQuestion.question_text}
               </CardTitle>
               {currentQuestion.explanation && (
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                     <Accordion type="single" collapsible className="w-full">
                        <AccordionItem
                           value="item-1"
                           className="border-gray-200 dark:border-gray-600"
                        >
                           <AccordionTrigger className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                              <div className="flex items-center gap-2">
                                 <FileQuestion
                                    size={20}
                                    className="text-emerald-500"
                                 />
                                 <p>힌트 보기</p>
                              </div>
                           </AccordionTrigger>
                           <AccordionContent className="text-gray-700 dark:text-gray-200">
                              <p className="font-semibold leading-7 break-words whitespace-pre-line">
                                 {currentQuestion.explanation}
                              </p>
                           </AccordionContent>
                        </AccordionItem>
                     </Accordion>
                  </CardDescription>
               )}
            </CardHeader>
            <CardContent className="pb-6">
               <QuizRadioButtonGroup
                  options={currentQuestion.options}
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
