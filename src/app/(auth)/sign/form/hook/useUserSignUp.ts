'use client'

import type { SignUpParams } from '@/entities/auth/types/sign-up'
import { encryptObject } from '@/shared/utils/crypto-helper'
import { useMutation } from '@tanstack/react-query'

interface SignUpResponse {
   success: boolean
   message: string
   errors?: any[]
}

// 회원가입 API 요청 함수 분리
const fetchSignUp = async (values: SignUpParams): Promise<SignUpResponse> => {
   const encryptedValues = encryptObject(values)
   const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(encryptedValues),
   })

   return await response.json()
}

// 회원가입 훅
export const useUserSignUp = () => {
   const {
      mutate,
      error,
      isPending = false,
   } = useMutation({
      mutationKey: ['signup'],
      mutationFn: fetchSignUp,
      onSuccess: (data) => {
         if (data.success) {
            alert(data.message)
            // window.location.href = '/sign/welcome'
         } else {
            alert(data.message)
         }
      },
   })

   return {
      error: error?.message || '',
      isPending,
      mutate,
   }
}
