import { Metadata } from 'next'
import SignUpWelcome from '@/components/Auth/Sign/SignUpWelcome'

export const metadata: Metadata = {
   title: '0rigin 회원가입을 하셨나요?',
   description: '0rigin 회원이시라면 로그인으로, 회원가입 페이지로 이동합니다.',
}

export default function SignPage() {
   return (
      //  회원가입 로그인 페이지로 이동
      <SignUpWelcome />
   )
}
