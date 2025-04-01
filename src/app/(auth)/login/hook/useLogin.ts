import { signInWithCredentials } from '@/auth'
import { createClient } from '@/lib/supabase/client'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { z } from 'zod'
import { LoginSchema } from '../types/schema'

export const useLogin = () => {
   const { push } = useRouter()
   const { setUser } = useAuthStore()
   const [loginError, setLoginError] = useState<string | null>(null)

   const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
      try {
         setLoginError(null)
         const formData = new FormData()
         formData.append('email', values.email)
         formData.append('password', values.password)
         const result = await signInWithCredentials(formData)

         if (result.error) {
            setLoginError('아이디 또는 비밀번호가 일치하지 않습니다.')

            return
         }

         if (result.success) {
            const supabase = createClient()
            const {
               data: { session },
            } = await supabase.auth.getSession()
            setUser(session?.user ?? null)
            push(result.redirectTo)
         }
      } catch (error) {
         setLoginError('로그인 처리 중 오류가 발생했습니다. 다시 시도해주세요.')
      }
   }

   return {
      loginError,
      onSubmit,
   }
}
