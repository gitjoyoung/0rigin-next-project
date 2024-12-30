import { Metadata } from 'next'
export const metadata: Metadata = {
   title: '0rigin 회원가입',
   description: '0rigin 회원가입 폼',
}
export default function layout({ children }: { children: React.ReactNode }) {
   return <>{children}</>
}
