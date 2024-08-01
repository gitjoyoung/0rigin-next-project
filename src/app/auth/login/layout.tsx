import { Metadata } from 'next'
export const metadata: Metadata = {
   title: '0rigin 로그인',
   description: '0rigin 로그인 페이지 입니다.',
}

export default function layout({ children }: { children: React.ReactNode }) {
   return <>{children}</>
}
