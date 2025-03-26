import { Metadata } from 'next'
import Login from './ui/LoginForm'

export const metadata: Metadata = {
   title: '0rigin 로그인 페이지',
   description: '0rigin 로그인 페이지입니다.',
}
export default function login() {
   return <Login />
}
