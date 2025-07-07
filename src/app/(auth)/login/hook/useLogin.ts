'use client'

import { encryptObject } from '@/shared/utils/crypto-helper'
import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'
import { LoginSchema } from '../types/schema'

// 로그인 API 요청 함수 분리
const fetchLogin = async (values: z.infer<typeof LoginSchema>) => {
   try {
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

      const data = await response.json()

      if (!response.ok) {
         return {
            success: false,
            message: data.message || '로그인 처리 중 오류가 발생했습니다.',
         }
      }

      return data
   } catch (error) {
      return {
         success: false,
         message:
            error instanceof Error
               ? error.message
               : '로그인 처리 중 오류가 발생했습니다.',
      }
   }
}
// 로그인 훅
export const useLogin = () => {
   const { mutate, error, isPending } = useMutation({
      mutationFn: fetchLogin,
      onSuccess: (result) => {
         if (!result.success) {
            throw new Error('아이디 또는 비밀번호가 일치하지 않습니다.')
         }
         // 로그인 성공 시 비회원 anon_key(visitor_id) 쿠키 삭제
         if (typeof document !== 'undefined') {
            document.cookie = 'visitor_id=; Max-Age=0; path=/;'
         }
         window.location.href = '/'
      },
      onError: (error) => {
         throw new Error(
            '서버와의 통신 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
         )
      },
   })

   return {
      loginError: error?.message ?? null,
      mutate,
      isPending,
   }
}
