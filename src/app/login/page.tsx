import Login from '@/components/Auth/Login/LoginForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
   title: '0rigin 로그인',
}
export default function login() {
   return <Login />
}
