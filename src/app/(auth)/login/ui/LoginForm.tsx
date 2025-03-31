'use client'
import { signInWithCredentials } from '@/auth'
import { ROUTE_FORGET, ROUTE_SIGN } from '@/constants/pathname'
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
   FormMessage,
} from '@/shared/shadcn/ui/form'
import { Input } from '@/shared/shadcn/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { LoginSchema } from '../types/schema'

export default function Login() {
   const form = useForm<z.infer<typeof LoginSchema>>({
      resolver: zodResolver(LoginSchema),
      defaultValues: {
         email: '',
         password: '',
      },
   })

   const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
      try {
         const formData = new FormData()
         formData.append('email', values.email)
         formData.append('password', values.password)
         await signInWithCredentials(formData)
      } catch (error) {
         console.error('Login error:', error)
      }
   }

   return (
      <div className="flex flex-col mt-12 w-full h-full items-center justify-center">
         <div className="text-center space-y-2 mb-8">
            <h2 className="text-3xl font-bold tracking-tight">환영합니다</h2>
            <p className="text-muted-foreground text-sm">
               {'"모든 위대한 여정은 작은 한 걸음에서 시작됩니다"'}
            </p>
         </div>
         <Card className="w-full max-w-md">
            <CardHeader>
               <CardTitle>로그인</CardTitle>
            </CardHeader>
            <CardContent>
               <Form {...form}>
                  <form
                     onSubmit={form.handleSubmit(onSubmit)}
                     className="space-y-4"
                  >
                     <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                           <FormItem>
                              <FormControl>
                                 <Input
                                    type="email"
                                    placeholder="이메일"
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                           <FormItem>
                              <FormControl>
                                 <Input
                                    type="password"
                                    placeholder="비밀번호"
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <div className="flex justify-center">
                        <Button
                           className="w-full"
                           type="submit"
                           disabled={form.formState.isSubmitting}
                        >
                           {form.formState.isSubmitting ? (
                              <>
                                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                 로그인 중...
                              </>
                           ) : (
                              '로그인'
                           )}
                        </Button>
                     </div>
                  </form>

                  <div className="mt-6 flex gap-4 justify-between">
                     <Button variant="outline" asChild>
                        <Link href={ROUTE_SIGN}>회원가입</Link>
                     </Button>
                     <Button variant="outline" asChild>
                        <Link href={ROUTE_FORGET}>비밀번호 분실</Link>
                     </Button>
                  </div>
               </Form>
            </CardContent>
         </Card>{' '}
      </div>
   )
}
