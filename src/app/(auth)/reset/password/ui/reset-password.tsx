'use client'

import {
   confirmPasswordSchema,
   passwordSchema,
} from '@/entities/auth/types/common'
import { SupabaseBrowserClient } from '@/shared/lib/supabase/supabase-browser-client'
import { Button } from '@/shared/shadcn/ui/button'
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
} from '@/shared/shadcn/ui/card'
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/shared/shadcn/ui/form'
import { Input } from '@/shared/shadcn/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const formSchema = z
   .object({
      password: passwordSchema,
      confirmPassword: confirmPasswordSchema,
   })
   .refine((data) => data.password === data.confirmPassword, {
      message: '비밀번호가 일치하지 않습니다',
      path: ['confirmPassword'],
   })

export default function ResetPassword() {
   const searchParams = useSearchParams()
   const router = useRouter()
   const supabase = SupabaseBrowserClient()

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         password: '',
         confirmPassword: '',
      },
   })

   useEffect(() => {
      const code = searchParams.get('code')
      if (!code) {
         router.push('/login')
      }
   }, [searchParams, router])

   const onSubmit = async (values: z.infer<typeof formSchema>) => {
      const code = searchParams.get('code')
      if (!code) return

      const { error } = await supabase.auth.exchangeCodeForSession(code)
      if (error) {
         console.error('Error exchanging code for session:', error)
         return
      }

      const { error: updateError } = await supabase.auth.updateUser({
         password: values.password,
      })

      if (updateError) {
         console.error('Error updating password:', updateError)
         return
      }

      router.push('/login')
   }

   return (
      <div className="flex w-full items-center justify-center mx-1">
         <Card className="w-full max-w-md">
            <CardHeader>
               <CardTitle>비밀번호 재설정</CardTitle>
            </CardHeader>
            <CardContent>
               <Form {...form}>
                  <form
                     onSubmit={form.handleSubmit(onSubmit)}
                     className="space-y-4"
                  >
                     <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>새 비밀번호</FormLabel>
                              <FormControl>
                                 <Input
                                    type="password"
                                    placeholder="새 비밀번호를 입력하세요"
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>비밀번호 확인</FormLabel>
                              <FormControl>
                                 <Input
                                    type="password"
                                    placeholder="비밀번호를 다시 입력하세요"
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <Button type="submit" className="w-full">
                        비밀번호 재설정
                     </Button>
                  </form>
               </Form>
            </CardContent>
         </Card>
      </div>
   )
}
