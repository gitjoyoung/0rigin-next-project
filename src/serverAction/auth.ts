'use server'

import { signIn } from '@/auth'

export const signInWithCredentials = async (
   formData: FormData,
): Promise<any> => {
   const email = formData.get('email')
   const password = formData.get('password')

   await signIn('credentials', {
      email,
      password,
      redirectTo: '/',
   })
}
