'use client'

import { signUp } from '@/shared/actions/auth-action'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { signUpSchema } from '../type/schema'

export const useUserSignUp = () => {
   const router = useRouter()

   const {
      mutate,
      error,
      isPending = false,
   } = useMutation({
      mutationFn: async (values: z.infer<typeof signUpSchema>) => {
         const formData = new FormData()
         Object.entries(values).forEach(([key, value]) => {
            if (typeof value === 'string') {
               formData.append(key, value)
            }
         })
         const signUpResult = await signUp(formData)
         if (!signUpResult.success) {
            switch (signUpResult.error) {
               case 'User already registered':
                  throw new Error('이미 등록된 사용자입니다.')
               case 'Invalid email format':
                  throw new Error('올바르지 않은 이메일 형식입니다.')
               case 'Password too weak':
                  throw new Error('비밀번호가 너무 약합니다.')
               default:
                  throw new Error(
                     signUpResult.error || '회원가입에 실패했습니다.',
                  )
            }
         }
         return signUpResult
      },
      onSuccess: () => {
         router.push('/sign/welcome')
      },
   })

   return {
      error: error?.message || '',
      isPending,
      mutate,
   }
}
