import { Metadata } from 'next'
import Login from './ui/LoginForm'

export const metadata: Metadata = {
   title: '0rigin 로그인',
}
export default function login() {
   return <Login />
}
