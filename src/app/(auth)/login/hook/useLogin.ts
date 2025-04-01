import { signInWithCredentials } from '@/auth'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { z } from 'zod'
import { LoginSchema } from '../types/schema'

export const useLogin = () => {
   const { push } = useRouter()
   const { setUser } = useAuthStore()
   const [loginError, setLoginError] = useState<string | null>(null)
   const [isLoading, setIsLoading] = useState(false)

   const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
      try {
         setIsLoading(true)
         setLoginError(null)
         const formData = new FormData()
         formData.append('email', values.email)
         formData.append('password', values.password)
         const result = await signInWithCredentials(formData)

         if (result.error) {
            setLoginError('아이디 또는 비밀번호가 일치하지 않습니다.')
            setIsLoading(false)
            return
         }

         if (result.success) {
            try {
               setUser(result.user ?? null)
               setIsLoading(false)
               push(result.redirectTo)
            } catch (sessionError) {
               setLoginError('사용자 정보를 가져오는 중 오류가 발생했습니다.')
               setIsLoading(false)
            }
         }
      } catch (error) {
         setLoginError('로그인 처리 중 오류가 발생했습니다. 다시 시도해주세요.')
         setIsLoading(false)
      }
   }

   return {
      loginError,
      onSubmit,
      isLoading,
   }
}
