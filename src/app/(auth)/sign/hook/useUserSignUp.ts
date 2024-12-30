import { signUpSchema } from '@/schema/signFormSchema'
import { useRouter } from 'next/router'
import { useState } from 'react'

export const useUserSignUp = () => {
   const [error, setError] = useState('')
   const { push } = useRouter()

   const handleSignUpSubmit = async (e) => {
      e.preventDefault()
      const formData = new FormData(e.target)
      const formObject = Object.fromEntries(formData)
      const result = signUpSchema.safeParse(formObject)
      const newErrors = []

      if (result.success === false) {
         result.error.errors.forEach((error) => {
            console.log(error)
            newErrors.push(error.message)
         })
         setError(newErrors.join(', '))
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
