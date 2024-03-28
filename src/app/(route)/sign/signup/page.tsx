import { Metadata } from 'next'
import SignContent from '@/components/Auth/Sign/SignContent'

export const metadata: Metadata = {
   title: '0rigin 회원가입',
   description: '0rigin 약관에 동의하고 회원가입을 진행합니다.',
}

export default function Page() {
   // 회원가입 페이지로 이동 여부
   return <SignContent />
}
