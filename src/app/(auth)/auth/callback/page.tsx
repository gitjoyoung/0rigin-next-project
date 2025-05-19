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

   // 타임스탬프를 추가하여 캐시를 무효화
   const timestamp = Date.now()

   if (!isSignupComplete) {
      redirect(`${ROUTE_SIGN}?t=${timestamp}`)
   }

   redirect(`/?t=${timestamp}`)
}
