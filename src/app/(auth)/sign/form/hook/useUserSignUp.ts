'use client'

import { signUp } from '@/auth'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { signUpSchema } from '../type/schema'

export const useUserSignUp = () => {
   const router = useRouter()
   const [error, setError] = useState('')
   const [isLoading, setIsLoading] = useState(false)

   const handleSignUpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setError('')
      setIsLoading(true)

      try {
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
            return false
         }
         await signUp(formData)
         router.push('/sign/welcome')
         return true
      } catch (err) {
         setError('회원가입 처리 중 오류가 발생했습니다. 다시 시도해주세요.')
         console.error('Sign up error:', err)
         return false
      } finally {
         setIsLoading(false)
      }
   }

   return { error, isLoading, handleSignUpSubmit }
}
