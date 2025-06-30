import { getUserServer } from '@/entities/auth/api/get-user-server'
import type { Metadata } from 'next'
import SignUpFlow from './ui/signup-flow'

export const metadata: Metadata = {
   title: '회원가입 양식',
   description: '0RIGIN(제로리진) 회원가입을 위한 정보를 입력해 주세요.',
}

export default async function SignFormPage() {
   const user = await getUserServer()

   return <SignUpFlow user={user} />
}
