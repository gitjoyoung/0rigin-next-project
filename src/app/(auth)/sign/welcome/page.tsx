import { getUser } from '@/entities/auth'
import type { Metadata } from 'next'
import WelcomePage from './ui'

export const metadata: Metadata = {
   title: '회원가입 완료',
   description: '0RIGIN(제로리진) 회원가입 완료 페이지입니다.',
}

export default async function page() {
   const user = await getUser()
   const userEmail = user?.email
   return <WelcomePage userEmail={userEmail} />
}
