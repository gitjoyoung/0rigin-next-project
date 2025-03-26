'use client'
import { Input } from '@/shared/shadcn/ui/input'
import React, { useId, useState } from 'react'
import { z } from 'zod'

interface Props {
   name: string
   pending?: boolean
   placeholder: string
   type: string
   maxLength?: number
   validate?: any
}

export default function InputValidator({
   name,
   pending,
   placeholder,
   type,
   maxLength = 60,
   validate,
}: Props) {
   const [inputValue, setInputValue] = useState<string>('')
   const [error, setError] = useState<string | null>(null)
   const [touched, setTouched] = useState<boolean>(false)

   const fieldId = useId()

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target
      setInputValue(value)
      setTouched(true)
      try {
         validate.parse(value) // 입력 값을 검증
         setError('') // 오류가 없을 경우 오류 메시지를 지웁니다
      } catch (err) {
         if (err instanceof z.ZodError) {
            setError(err.errors[0].message) // 첫 번째 오류 메시지를 설정합니다
            return
         }
      }
   }

   const inputClassName = () => {
      if (!touched) return 'border-gray-300'
      if (error) return 'border-red-500'
      if (!error) return 'border-green-500'
      return 'border-gray-300'
   }

   const textClassName = () => {
      if (!touched) return 'text-gray-500'
      if (error) return 'text-red-500'
      return 'text-green-500'
   }

   return (
      <div id={fieldId} className={`w-full  space-y-1  ${inputClassName()}`}>
         <Input
            disabled={pending}
            name={name}
            type={type}
            placeholder={placeholder}
            className="w-full bg-transparent outline-none"
            maxLength={maxLength}
            autoCapitalize="off"
            onChange={handleChange}
         />
         <p className={`text-xs ${textClassName()}`}>{error}</p>
      </div>
   )
}
