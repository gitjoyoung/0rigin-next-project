'use client'

import type { GoogleProfileParams } from '@/entities/auth/api/google-profile'
import { encryptObject } from '@/shared/utils/crypto-helper'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

interface GoogleProfileResponse {
   success: boolean
   message: string
   errors?: any[]
}

// 구글 프로필 생성 API 요청 함수
const fetchGoogleProfile = async (
   values: GoogleProfileParams,
): Promise<GoogleProfileResponse> => {
   const encryptedValues = encryptObject(values)
   const response = await fetch('/api/auth/google-profile', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(encryptedValues),
   })

   const result = await response.json()
   console.log('API 응답:', result)
   return result
}

// 구글 프로필 생성 훅
export const useGoogleProfile = () => {
   const router = useRouter()
   const {
      mutate,
      error,
      isPending = false,
   } = useMutation({
      mutationKey: ['google-profile'],
      mutationFn: fetchGoogleProfile,
      onSuccess: (data) => {
         console.log('onSuccess 호출됨, data:', data)
         if (data.success) {
            router.push('/sign/welcome')
         } else {
            console.log(JSON.stringify(data, null, 2))
         }
      },
      onError: (error) => {
         console.error('Google profile error:', error)
         alert('프로필 생성 중 오류가 발생했습니다.')
      },
   })

   return {
      error: error?.message || '',
      isPending,
      mutate,
   }
}
