'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { signUpSchema } from '../type/schema'

export const useUserSignUp = () => {
   const [error, setError] = useState('')
   const { push } = useRouter()

   const handleSignUpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const formData = new FormData(e.target as HTMLFormElement)
      const formObject = Object.fromEntries(formData)
      const result = signUpSchema.safeParse(formObject)
      const newErrors = []

      if (result.success === false) {
         result.error.errors.forEach((error) => {
            console.log(error)
            newErrors.push(error.message)
         })
         setError(newErrors.join('\n'))
         return
      }

      const fetchResult = await fetch('/api/signup', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(formObject),
      })

      const { success, message } = await fetchResult.json()
      if (success) {
         return push('/')
      }
      setError(message)
   }
   return { error, handleSignUpSubmit }
}
