import type { Metadata } from 'next'
import WelcomePage from './ui'

export const metadata: Metadata = {
   title: '회원가입 완료',
   description: '회원가입 완료 페이지입니다.',
}

export default function page() {
   return <WelcomePage />
}
