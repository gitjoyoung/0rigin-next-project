'use client'
import { QuizQuestion } from '@/entities/quiz/api/quiz-api'
import { Label } from '@/shared/shadcn/ui/label'
import { RadioGroup, RadioGroupItem } from '@/shared/shadcn/ui/radio-group'
import { cn } from '@/shared/utils/cn'

interface Props {
   question: QuizQuestion
   selectedOption: string
   onSelect: (value: string) => void
}

export default function QuizRadioButtonGroup({
   question,
   selectedOption,
   onSelect,
}: Props) {
   // 옵션들을 배열로 만들기
   const options = [
      { id: '1', text: question.option_1 },
      { id: '2', text: question.option_2 },
      ...(question.option_3 ? [{ id: '3', text: question.option_3 }] : []),
      ...(question.option_4 ? [{ id: '4', text: question.option_4 }] : []),
      ...(question.option_5 ? [{ id: '5', text: question.option_5 }] : []),
   ]

   return (
      <RadioGroup
         className="flex-col flex gap-3 my-2 justify-center"
         onValueChange={onSelect}
         value={selectedOption}
         defaultValue=""
      >
         {options.map(({ id, text }) => (
            <div key={id} className="flex items-center space-x-2">
               <RadioGroupItem value={id} id={id} />
               <Label
                  htmlFor={id}
                  className={cn(
                     'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                     selectedOption === id &&
                        'text-blue-600 dark:text-blue-400 font-semibold',
                  )}
               >
                  {text}
               </Label>
            </div>
         ))}
      </RadioGroup>
   )
}
