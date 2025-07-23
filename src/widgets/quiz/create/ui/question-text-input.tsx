'use client'

import {
   FormControl,
   FormField,
   FormItem,
   FormMessage,
} from '@/shared/shadcn/ui/form'
import { Input } from '@/shared/shadcn/ui/input'
import { UseFormReturn } from 'react-hook-form'
import { QuestionFormData } from '../types/quiz-form-types'

interface QuestionTextInputProps {
   form: UseFormReturn<QuestionFormData>
   index: number
}

export function QuestionTextInput({ form, index }: QuestionTextInputProps) {
   return (
      <FormField
         control={form.control}
         name="question_text"
         render={({ field }) => (
            <FormItem>
               <FormControl>
                  <Input
                     placeholder={`질문 ${index + 1}`}
                     className="border-gray-200"
                     {...field}
                  />
               </FormControl>
               <FormMessage />
            </FormItem>
         )}
      />
   )
}
