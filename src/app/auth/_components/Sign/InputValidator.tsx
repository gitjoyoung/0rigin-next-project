'use client'
import React, { useState } from 'react'

interface Props {
   name: string
   pending?: boolean
   placeholder: string
   type: string
   errorMsg?: string
   maxLength?: number
   validate?: any
}

export default function InputValidator({
   errorMsg,
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

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target
      setInputValue(value)
      setTouched(true)
      if (validate) {
         const validationError = validate(value)
         if (validationError) {
            setError(validationError)
            return
         }
      }
      setError(value.length > 3 ? null : errorMsg)
      if (value.length < 1) {
         setError('')
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
      <div className={`w-full border p-2 ${inputClassName()}`}>
         <input
            disabled={pending}
            name={name}
            type={type}
            placeholder={placeholder}
            className="w-full bg-transparent outline-none"
            maxLength={maxLength}
            autoCapitalize="off"
            value={inputValue}
            onChange={handleChange}
         />
         <p className={`text-xs ${textClassName()}`}>
            {error || (touched && errorMsg)}
         </p>
      </div>
   )
}
