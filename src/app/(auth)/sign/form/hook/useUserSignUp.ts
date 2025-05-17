'use client'

import type { SignUpParams } from '@/entities/auth/types/sign-up'
import { useMutation } from '@tanstack/react-query'

// 회원가입 API 요청 함수 분리
const fetchSignUp = async (values: SignUpParams) => {
   try {
      const response = await fetch(
         process.env.NEXT_PUBLIC_API_URL + '/api/auth/signup',
         {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
         },
      )

      const data = await response.json()

      if (!response.ok) {
         throw new Error(
            data.message || '회원가입 처리 중 오류가 발생했습니다.',
         )
      }

      return data.message || '회원가입이 완료되었습니다.'
   } catch (error) {
      throw new Error(
         error instanceof Error
            ? error.message
            : '회원가입 처리 중 오류가 발생했습니다.',
      )
   }
}

// 회원가입 훅
export const useUserSignUp = () => {
   const {
      mutate,
      error,
      isPending = false,
   } = useMutation({
      mutationFn: fetchSignUp,
      onSuccess: () => {
         window.location.href = '/sign/welcome'
      },
   })

   return {
      error: error?.message || '',
      isPending,
      mutate,
   }
}
