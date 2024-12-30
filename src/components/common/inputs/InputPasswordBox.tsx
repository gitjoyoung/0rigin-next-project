import { Icons } from '@/shared/ui/icons'
import React, { useState } from 'react'

interface Props {
   name: string
   placeholder: string
}

export default function InputPasswordBox({ name, placeholder }: Props) {
   const [showPassword, setShowPassword] = useState(false)

   return (
      <div className=" flex border max-w-[160px]">
         <input
            autoComplete="current-password"
            className="p-2 w-full "
            type={showPassword ? 'text' : 'password'}
            name={name}
            placeholder={placeholder}
            minLength={4}
            maxLength={10}
            required
         />
         <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className=" border-transparent inset-y-0 right-0 p-2 flex items-center"
         >
            {showPassword ? <Icons.eyeOpen /> : <Icons.eyeClosed />}
         </button>
      </div>
   )
}
