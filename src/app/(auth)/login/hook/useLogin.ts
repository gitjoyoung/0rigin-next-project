'use client'

import { encryptObject } from '@/shared/utils/crypto-helper'
import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'
import { LoginSchema } from '../types/schema'

// 로그인 API 요청 함수 분리
const fetchLogin = async (values: z.infer<typeof LoginSchema>) => {
   const encryptedValues = encryptObject(values)
   const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + '/api/auth/login',
      {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(encryptedValues),
      },
   )
   return await response.json()
}
// 로그인 훅
export const useLogin = () => {
   const { mutate, error, isPending } = useMutation({
      mutationFn: fetchLogin,
      onSuccess: (result) => {
         if (!result.success) {
            throw new Error('아이디 또는 비밀번호가 일치하지 않습니다.')
         }
         window.location.href = '/'
      },
      onError: (error) => {
         throw new Error(error.message)
      },
   })

   return {
      loginError: error?.message ?? null,
      mutate,
      isPending,
   }
}
