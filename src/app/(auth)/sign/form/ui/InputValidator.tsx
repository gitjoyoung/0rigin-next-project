'use client'
import { cn } from '@/lib/utils'
import { Input } from '@/shared/shadcn/ui/input'
import React, { useCallback, useId, useMemo, useState } from 'react'
import { z } from 'zod'

interface Props {
   name: string
   placeholder: string
   type: string
   maxLength?: number
   validate?: z.ZodType<any>
   disabled?: boolean
   required?: boolean
   ariaLabel?: string
   onValidationChange?: (isValid: boolean) => void
   className?: string
}

export default function InputValidator({
   name,
   placeholder,
   type,
   maxLength = 60,
   validate,
   disabled,
   required = false,
   ariaLabel,
   onValidationChange,
   className,
}: Props) {
   const [error, setError] = useState<string | null>(null)
   const [touched, setTouched] = useState<boolean>(false)
   const fieldId = useId()

   const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
         const { value } = e.target
         setTouched(true)

         if (!validate) {
            setError(null)
            onValidationChange?.(true)
            return
         }

         try {
            validate.parse(value)
            setError(null)
            onValidationChange?.(true)
         } catch (err) {
            if (err instanceof z.ZodError) {
               const errorMessage =
                  err.errors[0]?.message || '유효하지 않은 입력입니다.'
               setError(errorMessage)
               onValidationChange?.(false)
            }
         }
      },
      [validate, onValidationChange],
   )

   const inputClassName = useMemo(() => {
      if (!touched) return 'border-gray-300 focus:border-blue-500'
      if (error) return 'border-red-500 focus:border-red-500'
      return 'border-green-500 focus:border-green-500'
   }, [touched, error])

   const textClassName = useMemo(() => {
      if (!touched) return 'text-gray-500'
      if (error) return 'text-red-500'
      return 'text-green-500'
   }, [touched, error])

   return (
      <div
         id={fieldId}
         className={cn(
            'w-full space-y-1.5',
            'sm:space-y-2',
            'md:space-y-2.5',
            inputClassName,
            className,
         )}
         role="group"
         aria-labelledby={`${fieldId}-label`}
      >
         <label
            id={`${fieldId}-label`}
            htmlFor={fieldId}
            className={cn(
               'sr-only',
               'text-sm font-medium text-gray-700',
               'sm:text-base',
            )}
         >
            {ariaLabel || placeholder}
         </label>
         <Input
            id={fieldId}
            disabled={disabled}
            name={name}
            type={type}
            placeholder={placeholder}
            className={cn(
               'w-full bg-transparent outline-none transition-colors duration-200',
               'px-3 py-2',
               'text-sm sm:text-base',
               'placeholder:text-gray-400',
               'disabled:opacity-50 disabled:cursor-not-allowed',
               'focus:ring-2 focus:ring-offset-2',
               'rounded-md',
            )}
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
               className={cn(
                  'text-xs sm:text-sm',
                  'font-medium',
                  textClassName,
                  'transition-colors duration-200',
               )}
               role="alert"
            >
               {error}
            </p>
         )}
      </div>
   )
}
