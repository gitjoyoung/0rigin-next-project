'use client'

import {
   FormControl,
   FormField,
   FormItem,
   FormMessage,
} from '@/shared/shadcn/ui/form'
import { Input } from '@/shared/shadcn/ui/input'
import { Label } from '@/shared/shadcn/ui/label'
import { RadioGroup, RadioGroupItem } from '@/shared/shadcn/ui/radio-group'
import { UseFormReturn } from 'react-hook-form'
import { QuestionFormData } from '../types/quiz-form-types'

interface QuestionOptionInputProps {
   form: UseFormReturn<QuestionFormData>
   optionNum: number
   index: number
   watchCorrectAnswer: number
}

export function QuestionOptionInput({
   form,
   optionNum,
   index,
   watchCorrectAnswer,
}: QuestionOptionInputProps) {
   const data = form.watch()

   return (
      <div className="flex items-center gap-3">
         <div className="flex-shrink-0">
            <Label className="text-purple-600 font-semibold text-sm px-2 py-1 bg-purple-50 rounded">
               A{optionNum}
            </Label>
         </div>
         <div className="flex-1">
            <FormField
               control={form.control}
               name={`option_${optionNum}` as keyof typeof data}
               render={({ field }) => (
                  <FormItem>
                     <FormControl>
                        <Input
                           placeholder={`답 ${optionNum}`}
                           className="border-gray-200"
                           {...field}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
         </div>
         <div className="flex-shrink-0">
            <RadioGroup
               onValueChange={(value) =>
                  form.setValue('correct_answer', parseInt(value))
               }
               value={watchCorrectAnswer.toString()}
            >
               <div className="flex items-center">
                  <RadioGroupItem
                     value={optionNum.toString()}
                     id={`correct-${index}-${optionNum}`}
                     className="text-purple-600 border-purple-300"
                     disabled={
                        !data[`option_${optionNum}` as keyof typeof data]
                     }
                  />
               </div>
            </RadioGroup>
         </div>
      </div>
   )
}
