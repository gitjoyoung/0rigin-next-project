import React from 'react'

interface Props {
   errorMsg: string
   name: string
   pending: boolean
   placeholder: string
   hasError: boolean
   type: string
}

export default function InputAndCheck({
   errorMsg,
   name,
   pending,
   placeholder,
   hasError,
   type,
}: Props) {
   return (
      <>
         <input
            disabled={pending}
            name={name}
            type={type}
            placeholder={placeholder}
            className="border border-gray-300 p-2"
         />
         <p className={`${hasError ? 'text-xs text-red-500' : 'text-xs '}`}>
            {errorMsg}
         </p>
      </>
   )
}
