'use client'

import { useAuthCallback } from '../hook/useAuthCallback'

export default function AuthCallback() {
   const { status, error } = useAuthCallback()

   const getMessage = () => {
      switch (status) {
         case 'loading':
            return '로그인 처리 중'
         case 'redirecting':
            return '이동 중'
         case 'error':
            return error || '오류 발생'
         default:
            return '처리 중'
      }
   }

   return (
      <div className="min-h-screen flex items-center justify-center bg-background">
         <div className="text-center space-y-4">
            {/* 점 3개 애니메이션 */}
            <div className="flex justify-center space-x-1">
               <div
                  className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                  style={{ animationDelay: '0ms' }}
               />
               <div
                  className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                  style={{ animationDelay: '150ms' }}
               />
               <div
                  className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                  style={{ animationDelay: '300ms' }}
               />
            </div>

            {/* 메시지 */}
            <p className="text-sm text-muted-foreground">{getMessage()}</p>
         </div>
      </div>
   )
}
