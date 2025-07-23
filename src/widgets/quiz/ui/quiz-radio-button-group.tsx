'use client'
import { Label } from '@/shared/shadcn/ui/label'
import { RadioGroup, RadioGroupItem } from '@/shared/shadcn/ui/radio-group'
import { cn } from '@/shared/utils/cn'

interface QuizOption {
   id: string
   text: string
}

interface Props {
   options: QuizOption[]
   selectedOption: string
   onSelect: (value: string) => void
}

export default function QuizRadioButtonGroup({
   options,
   selectedOption,
   onSelect,
}: Props) {
   return (
      <RadioGroup
         className="flex-col flex gap-4 my-2 justify-center"
         onValueChange={onSelect}
         value={selectedOption}
         defaultValue=""
      >
         {options.map(({ id, text }) => (
            <div
               key={id}
               className={cn(
                  'flex items-center space-x-3 p-4 rounded-xl transition-all duration-200 cursor-pointer',
                  'bg-white dark:bg-gray-800/50',
                  'hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-sm',
                  selectedOption === id &&
                     'bg-blue-50 dark:bg-blue-950/30 shadow-md',
               )}
               onClick={() => onSelect(id)}
            >
               <RadioGroupItem
                  value={id}
                  id={id}
                  className="border-2 border-gray-300 dark:border-gray-500 data-[state=checked]:border-blue-600 dark:data-[state=checked]:border-blue-400"
               />
               <Label
                  htmlFor={id}
                  className={cn(
                     'text-sm font-medium leading-relaxed cursor-pointer flex items-center flex-1',
                     'text-gray-900 dark:text-gray-100',
                  )}
               >
                  {text}
               </Label>
            </div>
         ))}
      </RadioGroup>
   )
}
