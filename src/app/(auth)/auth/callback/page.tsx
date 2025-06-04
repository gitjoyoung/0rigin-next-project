import { ROUTE_LOGIN, ROUTE_SIGN } from '@/constants/pathname'
import { checkSignupCompleteServer } from '@/entities/auth/api/google'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function AuthCallback({
   searchParams,
}: {
   searchParams: { error?: string; error_description?: string }
}) {
   // 캐시 무효화를 위한 헤더 설정
   headers()

   // OAuth 에러 확인 (사용자가 로그인을 취소하거나 에러가 발생한 경우)
   if (searchParams.error) {
      console.log(
         'OAuth 에러:',
         searchParams.error,
         searchParams.error_description,
      )

      // 사용자가 로그인을 취소한 경우
      if (searchParams.error === 'access_denied') {
         redirect(ROUTE_LOGIN + '?message=로그인이 취소되었습니다.')
      }

      // 기타 OAuth 에러
      redirect(ROUTE_LOGIN + '?message=로그인 중 오류가 발생했습니다.')
   }

   let isSignupComplete = false

   try {
      // 회원가입 완료 상태 확인
      isSignupComplete = await checkSignupCompleteServer()
      console.log('콜백 - 회원가입 완료 상태:', isSignupComplete)
   } catch (error) {
      console.error('콜백 처리 중 에러:', error)
      redirect(ROUTE_LOGIN + '?message=인증 처리 중 오류가 발생했습니다.')
   }

   if (!isSignupComplete) {
      console.log('콜백 - 회원가입 페이지로 리다이렉트')
      redirect(ROUTE_SIGN)
   }

   console.log('콜백 - 홈으로 리다이렉트')
   redirect('/')
}

// 로딩 컴포넌트 추가
export function Loading() {
   return (
      <div className="min-h-screen flex items-center justify-center">
         <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">로그인 처리 중...</p>
         </div>
      </div>
   )
}
