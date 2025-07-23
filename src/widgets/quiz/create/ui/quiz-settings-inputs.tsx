'use client'

import {
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/shared/shadcn/ui/form'
import { Input } from '@/shared/shadcn/ui/input'
import { UseFormReturn } from 'react-hook-form'
import { QuizFormData } from '../types/quiz-form-types'

interface QuizSettingsInputsProps {
   form: UseFormReturn<QuizFormData>
}

export function QuizSettingsInputs({ form }: QuizSettingsInputsProps) {
   return (
      <>
         <FormField
            control={form.control}
            name="questionCount"
            render={({ field }) => (
               <FormItem>
                  <FormLabel>문제 개수</FormLabel>
                  <FormControl>
                     <Input
                        type="number"
                        min="1"
                        max="20"
                        placeholder="문제 개수를 입력해주세요"
                        {...field}
                        onChange={(e) =>
                           field.onChange(parseInt(e.target.value) || 1)
                        }
                     />
                  </FormControl>
                  <FormMessage />
               </FormItem>
            )}
         />

         <FormField
            control={form.control}
            name="pass_score"
            render={({ field }) => (
               <FormItem>
                  <FormLabel>합격 점수 (%)</FormLabel>
                  <FormControl>
                     <Input
                        type="number"
                        min="1"
                        max="100"
                        {...field}
                        onChange={(e) =>
                           field.onChange(parseInt(e.target.value) || 60)
                        }
                     />
                  </FormControl>
                  <FormMessage />
               </FormItem>
            )}
         />
      </>
   )
}
