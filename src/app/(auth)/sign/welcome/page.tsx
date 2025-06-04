import { getUserServer } from '@/entities/auth/api/get-user-server'
import type { Metadata } from 'next'
import WelcomePage from './ui'

export const metadata: Metadata = {
   title: '회원가입 완료',
   description: '회원가입 완료 페이지입니다.',
}

export default async function page() {
   const user = await getUserServer()
   const userEmail = user?.email
   return <WelcomePage userEmail={userEmail} />
}
