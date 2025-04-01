'use server'

import { createClient } from '@/lib/supabase/server'

export async function auth() {
   const supabase = await createClient()
   const {
      data: { session },
   } = await supabase.auth.getSession()
   return session
}

export const signInWithCredentials = async (
   formData: FormData,
): Promise<any> => {
   const email = formData.get('email') as string
   const password = formData.get('password') as string
   const supabase = await createClient()

   const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
   })

   console.log('로그인 시도 결과:', {
      email,
      password,
      error: error?.message,
   })
   if (error) {
      return { error: error.message }
   }

   return { success: true, redirectTo: '/' }
}

export const signUp = async (formData: FormData): Promise<any> => {
   const email = formData.get('email') as string
   const password = formData.get('password') as string
   const name = formData.get('name') as string

   const supabase = await createClient()

   const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
         data: {
            name: name,
         },
      },
   })

   console.log('회원가입 시도 결과:', {
      data: {
         email,
         password,
         name: 'test',
      },
      success: !error,
      error: error?.message,
   })

   if (error) {
      return { error: error.message }
   }

   return { success: true, message: '이메일 인증을 확인해주세요.' }
}

export const signOut = async (): Promise<
   { success: true } | { error: string }
> => {
   const supabase = await createClient()
   const { error } = await supabase.auth.signOut()

   if (error) {
      return { error: error.message }
   }

   return { success: true }
}

export const resetPassword = async (formData: FormData): Promise<any> => {
   const email = formData.get('email') as string

   const supabase = await createClient()

   const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
   })

   if (error) {
      return { error: error.message }
   }

   return { success: true, message: '비밀번호 재설정 이메일을 확인해주세요.' }
}

export const updatePassword = async (formData: FormData): Promise<any> => {
   const password = formData.get('password') as string

   const supabase = await createClient()

   const { error } = await supabase.auth.updateUser({
      password,
   })

   if (error) {
      return { error: error.message }
   }

   return { success: true, message: '비밀번호가 변경되었습니다.' }
}
