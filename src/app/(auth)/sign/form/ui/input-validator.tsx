'use client'
import { Input } from '@/shared/shadcn/ui/input'
import React, { useId, useState } from 'react'
import { z } from 'zod'

interface BaseInputProps {
   name: string
   placeholder: string
   type: string
   ariaLabel?: string
}

interface ValidationProps {
   validate?: z.ZodType<any>
   onValidationChange?: (isValid: boolean) => void
}

interface StyleProps {
   maxLength?: number
   disabled?: boolean
   required?: boolean
}

type Props = BaseInputProps & ValidationProps & StyleProps

export default function InputValidator({
   name,
   placeholder,
   type,
   maxLength = 30,
   validate,
   disabled,
   required = false,
   ariaLabel,
   onValidationChange,
}: Props) {
   const [error, setError] = useState<string | null>(null)
   const fieldId = useId()

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!validate) {
         setError(null)
         onValidationChange?.(true)
         return
      }
      const { value } = e.target
      const { success, error } = validate.safeParse(value)
      if (success) {
         setError(null)
         onValidationChange?.(true)
      }
      if (error) {
         const errorMessage =
            error.errors[0]?.message || '유효하지 않은 입력입니다.'
         setError(errorMessage)
         onValidationChange?.(false)
      }
   }

   return (
      <div
         id={fieldId}
         className="w-full space-y-1.5 sm:space-y-2 md:space-y-2.5"
         role="group"
         aria-labelledby={`${fieldId}-label`}
      >
         <label
            id={`${fieldId}-label`}
            htmlFor={fieldId}
            className="sr-only text-sm font-medium"
         >
            {ariaLabel || placeholder}
         </label>
         <Input
            id={fieldId}
            disabled={disabled}
            name={name}
            type={type}
            placeholder={placeholder}
            className="w-full bg-transparent outline-none transition-colors duration-200 px-3 py-2 text-sm sm:text-base placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-offset-2 rounded-md"
            maxLength={maxLength}
            autoCapitalize="off"
            onChange={handleChange}
            required={required}
            aria-invalid={!!error}
            aria-describedby={error ? `${fieldId}-error` : undefined}
         />
         {error && (
            <p
               id={`${fieldId}-error`}
               className="text-xs sm:text-sm font-medium text-red-500 transition-colors duration-200"
               role="alert"
            >
               {error}
            </p>
         )}
      </div>
   )
}
