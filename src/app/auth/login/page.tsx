import { Metadata } from 'next'
import { auth, signIn } from '@/auth'
import { redirect } from 'next/navigation'
import Login from '../_components/Login/LoginForm'

export const metadata: Metadata = {
   title: '0rigin 로그인',
}
export default async function login() {
   const session = await auth()
   console.log('session', session)
   const handleLoginSubmit = async (formData: HTMLFormElement) => {
      'use server'
      console.log('credential ')

      const credential = await signIn('credentials', {
         ...formData,
         redirectTo: '/',
      })
      console.log('credential', credential)
   }
   return <Login handleLoginSubmit={handleLoginSubmit} />
}
