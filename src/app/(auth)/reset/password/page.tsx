import type { Metadata } from 'next'
import ResetPassword from './ui/reset-password'

export const metadata: Metadata = {
   title: '비밀번호 재설정',
   description: '0RIGIN(제로리진) 계정의 비밀번호를 재설정합니다.',
}

export default function page() {
   return <ResetPassword />
}
