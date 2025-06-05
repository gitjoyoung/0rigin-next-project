'use client'

import { useAuthCallback } from '../hook/useAuthCallback'

export default function AuthCallbackUI() {
   const { status } = useAuthCallback()

   const message =
      status === 'loading' ? '로그인 처리 중...' : '페이지로 이동 중...'

   return (
      <div className="min-h-screen flex items-center justify-center">
         <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">{message}</p>
         </div>
      </div>
   )
}
