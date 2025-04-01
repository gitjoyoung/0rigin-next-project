'use client'

import { signUp } from '@/auth'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { signUpSchema } from '../type/schema'
export const useUserSignUp = () => {
   const router = useRouter()
   const { setUser } = useAuthStore()
   const [error, setError] = useState('')
   const [isLoading, setIsLoading] = useState(false)

   const handleSignUpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setError('')
      setIsLoading(true)

      try {
         const formData = new FormData(e.target as HTMLFormElement)
         const formObject = Object.fromEntries(formData)
         const { error } = signUpSchema.safeParse(formObject)

         if (error) {
            const errorMessages = error.errors.map((error) => error.message)
            setError(errorMessages.join('\n'))
            return false
         }

         const signUpResult = await signUp(formData)
         if (signUpResult.success) {
            setUser(signUpResult.user ?? null)
            router.push('/sign/welcome')
            return true
         } else {
            setError(signUpResult.error || '회원가입에 실패했습니다.')
            return false
         }
      } catch (err) {
         const errorMessage =
            err instanceof Error
               ? `회원가입 처리 중 오류가 발생했습니다: ${err.message}`
               : '회원가입 처리 중 오류가 발생했습니다. 다시 시도해주세요.'
         setError(errorMessage)
         return false
      } finally {
         setIsLoading(false)
      }
   }

   return { error, isLoading, handleSignUpSubmit }
}
