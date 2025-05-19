import { checkSignupCompleteServer } from '@/entities/auth/api/google'
import { redirect } from 'next/navigation'

export default async function AuthCallback() {
   const isSignupComplete = await checkSignupCompleteServer()

   if (!isSignupComplete) {
      redirect('/sign/form')
   }

   redirect('/')
}
