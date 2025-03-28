import { Label } from '@/shared/shadcn/ui/label'
import { RadioGroup, RadioGroupItem } from '@/shared/shadcn/ui/radio-group'
import { cn } from '@/shared/utils'
import { nanoid } from 'nanoid'
import { useState } from 'react'

interface Props {}

export default function QuizRadioButtonGroup({ questions, answer, disabled }) {
   const [selectedOption, setSelectedOption] = useState(null)
   return (
      <RadioGroup
         className="flex-col flex gap-2 my-2 justify-center"
         onValueChange={(value) => setSelectedOption(value)}
      >
         {questions.map(({ id, value }, index) => (
            <div key={nanoid()} className="flex items-center space-x-2">
               <RadioGroupItem value={id} id={id} />
               <Label
                  htmlFor={id}
                  className={cn(
                     'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                     selectedOption === id && id === answer
                        ? 'text-green-500'
                        : '',
                  )}
               >
                  {value}
               </Label>
            </div>
         ))}
      </RadioGroup>
   )
}
