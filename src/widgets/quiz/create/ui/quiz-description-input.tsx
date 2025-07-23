'use client'

import {
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/shared/shadcn/ui/form'
import { Textarea } from '@/shared/shadcn/ui/textarea'
import { UseFormReturn } from 'react-hook-form'
import { QuizFormData } from '../types/quiz-form-types'

interface QuizDescriptionInputProps {
   form: UseFormReturn<QuizFormData>
}

export function QuizDescriptionInput({ form }: QuizDescriptionInputProps) {
   return (
      <FormField
         control={form.control}
         name="description"
         render={({ field }) => (
            <FormItem>
               <FormLabel>퀴즈 설명 (선택사항)</FormLabel>
               <FormControl>
                  <Textarea
                     placeholder="퀴즈에 대한 설명을 입력해주세요"
                     {...field}
                  />
               </FormControl>
               <FormMessage />
            </FormItem>
         )}
      />
   )
}
