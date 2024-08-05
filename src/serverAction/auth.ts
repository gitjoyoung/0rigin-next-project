'use server'

import { signIn } from '@/auth'

export const signInWithCredentials = async (
   formData: FormData,
): Promise<any> => {
   await signIn('credentials', {
      email: formData.get('email') || '',
      password: formData.get('password') || '',
      redirectTo: '/',
   })
}
