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
import { useState } from 'react'
import { IQuizData } from '../types/quiz-type'
import QuizNavButton from './QuizNavButton'
import QuizRadioButtonGroup from './QuizRadioButtonGroup'

export default function Quiz({ quizData }: { quizData: IQuizData[] }) {
   const quizDataLength = quizData.length
   const [curIndex, setCurIndex] = useState(0)
   const [selectedOption, setSelectedOption] = useState<string | null>(null)
   const progress =
      quizDataLength > 1 ? (curIndex / (quizDataLength - 1)) * 100 : 100

   const handleIndexChange = (newIndex: number) => {
      setSelectedOption(null)
      setCurIndex(newIndex)
   }

   return (
      <section className="flex flex-col justify-center w-full gap-3 ">
         <Progress value={progress} />
         <Card className="font-noto ">
            <CardHeader>
               <CardTitle className="leading-relaxed">
                  {quizData[curIndex].question}
               </CardTitle>
               <CardDescription>
                  <Accordion type="single" collapsible className="w-full ">
                     <AccordionItem value="item-1">
                        <AccordionTrigger>
                           <div className="flex items-center gap-2">
                              <Icons.fileQuestion size={20} />
                              <p>힌트 보기</p>
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
                  selectedOption={selectedOption}
                  onSelect={setSelectedOption}
               />
            </CardContent>
         </Card>
         <QuizNavButton
            curIndex={curIndex}
            setCurIndex={handleIndexChange}
            quizDataLength={quizDataLength}
         />
      </section>
   )
}
