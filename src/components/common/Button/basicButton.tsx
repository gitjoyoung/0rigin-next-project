import React from 'react'
import { useFormStatus } from 'react-dom'

interface Props {
   label: string
   onClick?: () => void
   type: 'button' | 'submit'
}

export default function BasicButton({ label, onClick, type }: Props) {
   const { pending } = useFormStatus()

   return (
      <button
         type={type === 'button' ? 'button' : 'submit'}
         className="p-3"
         disabled={pending}
         onClick={onClick}
      >
         {label}
      </button>
   )
}
