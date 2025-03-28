'use client'

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
import { Progress } from '@/shared/shadcn/ui/progress'
import { Icons } from '@/shared/ui/icons'
import { QuizData } from '@/types/quizTypes'
import { useState } from 'react'
import QuizNavButton from './QuizNavButton'
import QuizRadioButtonGroup from './QuizRadioButtonGroup'
interface QuizDataList {
   quizData: QuizData[]
}

export default function Quiz({ quizData }: QuizDataList) {
   const quizDataLength = quizData.length
   const [curIndex, setCurIndex] = useState(0)
   const progress =
      quizDataLength > 1 ? (curIndex / (quizDataLength - 1)) * 100 : 100

   return (
      <section>
         <div className="flex justify-center items-center gap-3 flex-wrap">
            <Progress value={progress} className="rounded-none" />

            <div className="w-[800px] flex flex-col gap-4">
               <Card className="p-4">
                  <CardHeader>
                     <CardTitle>{quizData[curIndex].question}</CardTitle>
                     <CardDescription>
                        <Accordion
                           type="single"
                           collapsible
                           className="w-full "
                        >
                           <AccordionItem value="item-1">
                              <AccordionTrigger>
                                 <div className="flex items-center gap-2">
                                    <Icons.fileQuestion size={20} />
                                    <p>힌드 보기</p>
                                 </div>
                              </AccordionTrigger>
                              <AccordionContent>
                                 {quizData[curIndex].hint}
                              </AccordionContent>
                           </AccordionItem>
                        </Accordion>
                     </CardDescription>
                  </CardHeader>
                  <CardContent>
                     <QuizRadioButtonGroup
                        questions={quizData[curIndex].options}
                        answer={quizData[curIndex].answer}
                        disabled={curIndex === quizDataLength - 1}
                     />
                  </CardContent>
               </Card>
               <QuizNavButton
                  curIndex={curIndex}
                  setCurIndex={setCurIndex}
                  quizDataLength={quizDataLength}
               />
            </div>
         </div>
      </section>
   )
}
