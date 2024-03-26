'use client'

import React from 'react'
import { useFormStatus } from 'react-dom'

interface Props {
   label: string
   onClick?: () => void
}

export default function FormSubmitButton({ label, onClick }: Props) {
   const { pending } = useFormStatus()
   return (
      <button
         type="submit"
         className="p-3 "
         disabled={pending}
         onClick={onClick}
      >
         {label}
      </button>
   )
}
