'use client'
import { Label } from '@/shared/shadcn/ui/label'
import { RadioGroup, RadioGroupItem } from '@/shared/shadcn/ui/radio-group'
import { cn } from '@/shared/utils/cn'

interface Props {
   questions: Array<{ id: string; value: string }>
   selectedOption: string | null
   onSelect: (value: string) => void
}

export default function QuizRadioButtonGroup({
   questions,
   selectedOption,
   onSelect,
}: Props) {
   return (
      <RadioGroup
         className="flex-col flex gap-3 my-2 justify-center "
         onValueChange={onSelect}
         value={selectedOption || ''}
         defaultValue=""
      >
         {questions.map(({ id, value }) => (
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
                  {value}
               </Label>
            </div>
         ))}
      </RadioGroup>
   )
}
