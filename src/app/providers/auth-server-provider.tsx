// shared/auth/AuthServerProvider.tsx
'use server' // ✅ 서버 컴포넌트임을 명시
import { checkSignupCompleteServer } from '@/entities/auth/api/get-user'
import type { ReactNode } from 'react'
import { AuthClientProvider } from './auth-client-provider'

export default async function AuthServerProvider({
   children,
}: {
   children: ReactNode
}) {
   const initial = await checkSignupCompleteServer()

   return <AuthClientProvider initial={initial}>{children}</AuthClientProvider>
}
