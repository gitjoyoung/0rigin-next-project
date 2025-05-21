import { ROUTE_SIGN } from '@/constants/pathname'
import { checkSignupCompleteServer } from '@/entities/auth/api/google'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function AuthCallback() {
   // 캐시 무효화를 위한 헤더 설정
   headers()

   const isSignupComplete = await checkSignupCompleteServer()

   if (!isSignupComplete) {
      // return을 추가하여 함수 실행 종료
      return redirect(process.env.NEXT_PUBLIC_URL + ROUTE_SIGN)
   }

   return redirect(process.env.NEXT_PUBLIC_URL)
}
