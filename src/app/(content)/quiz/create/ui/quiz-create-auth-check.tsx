'use client'

import { useToast } from '@/shared/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function QuizCreateAuthCheck() {
   const router = useRouter()
   const { toast } = useToast()

   useEffect(() => {
      // Toaster 표시
      toast({
         title: '회원만 작성 가능합니다.',
         description: '퀴즈를 제작하려면 회원 권한이 필요합니다.',
         variant: 'destructive',
      })

      // 즉시 퀴즈 페이지로 리다이렉트
      router.push('/quiz?error=login_required')
   }, [router, toast])

   return null
}
