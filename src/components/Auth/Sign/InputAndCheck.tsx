'use client'
import React, { useState } from 'react'

interface Props {
   name: string
   pending?: boolean
   placeholder: string
   type: 'text' | 'password'
   errorMsg?: string
   maxLength?: number
   validate?: (value: string) => string | null
}

export default function InputAndCheck({
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

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target
      setInputValue(value)
      if (value.length > 3) {
         setError(errorMsg)
         return
      }
      setError(null)
   }

   return (
      <div
         className={`w-full border p-2 ${error && error ? 'border-green-500' : 'border-red-500'}`}
      >
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
         <label
            htmlFor={name}
            className={` text-xs ${error && error ? 'text-green-500' : 'text-red-500'}`}
         >
            {error || errorMsg}
         </label>
      </div>
   )
}
