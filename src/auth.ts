'use server'

import { createClient } from '@/lib/supabase/server'

export async function auth() {
   const supabase = await createClient()
   const {
      data: { user },
   } = await supabase.auth.getUser()
   return user
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
   if (error) {
      return { error: error.message }
   }

   const {
      data: { user },
   } = await supabase.auth.getUser()

   return {
      success: true,
      user,
   }
}

export const signUp = async (
   formData: FormData,
): Promise<{
   success: boolean
   message?: string
   error?: string
   user?: any
}> => {
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

   if (error) {
      return { success: false, error: error.message }
   }
   const {
      data: { user },
   } = await supabase.auth.getUser()

   return { success: true, user }
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
