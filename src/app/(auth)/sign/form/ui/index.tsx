'use client'

import { Button } from '@/shared/shadcn/ui/button'
import {
   Card,
   CardContent,
   CardDescription,
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
import { Icons } from '@/shared/ui/icons'
import { LoadingSpinner } from '@/shared/ui/spinner/loading-spinner'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useUserSignUp } from '../hook/useUserSignUp'
import { signUpSchema } from '../type/schema'
import GenderRadioButton from './gender-radio-button'

export default function SignForm() {
   const { error, mutate, isPending } = useUserSignUp()
   const form = useForm<z.infer<typeof signUpSchema>>({
      resolver: zodResolver(signUpSchema),
      defaultValues: {
         gender: '남성',
         email: '',
         password: '',
         confirmPassword: '',
      },
      mode: 'onChange',
   })

   return (
      <section className="w-full flex justify-center">
         <Card className="w-full max-w-[350px]">
            <CardHeader>
               <CardTitle className="text-2xl">0rigin 회원가입</CardTitle>
               <CardDescription className="text-transparent">
                  자유 의지가 존재할까요?
               </CardDescription>
            </CardHeader>
            <CardContent>
               <Form {...form}>
                  <form
                     onSubmit={form.handleSubmit((formData) =>
                        mutate(formData),
                     )}
                     className="flex flex-col gap-3 w-full"
                  >
                     <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                           <GenderRadioButton
                              disabled={isPending}
                              value={field.value}
                              onChange={(value) => field.onChange(value)}
                           />
                        )}
                     />
                     <div className="flex flex-col py-2 gap-3">
                        <FormField
                           control={form.control}
                           name="email"
                           render={({ field, fieldState }) => (
                              <FormItem>
                                 <FormControl>
                                    <Input
                                       disabled={isPending}
                                       placeholder={'이메일을 입력하세요'}
                                       name="email"
                                       type="email"
                                       maxLength={30}
                                       {...field}
                                    />
                                 </FormControl>
                                 {fieldState.error && field.value && (
                                    <FormMessage className="pl-2 text-xs" />
                                 )}
                              </FormItem>
                           )}
                        />
                        <FormField
                           control={form.control}
                           name="password"
                           render={({ field, fieldState }) => (
                              <FormItem>
                                 <FormControl>
                                    <Input
                                       disabled={isPending}
                                       placeholder={'비밀번호를 입력하세요'}
                                       name="password"
                                       type="password"
                                       maxLength={30}
                                       {...field}
                                    />
                                 </FormControl>
                                 {fieldState.error && field.value && (
                                    <FormMessage className="pl-2 text-xs" />
                                 )}
                              </FormItem>
                           )}
                        />
                        <FormField
                           control={form.control}
                           name="confirmPassword"
                           render={({ field, fieldState }) => (
                              <FormItem>
                                 <FormControl>
                                    <Input
                                       disabled={isPending}
                                       placeholder={'비밀번호 재확인'}
                                       name="confirmPassword"
                                       type="password"
                                       maxLength={30}
                                       {...field}
                                    />
                                 </FormControl>
                                 {fieldState.error && field.value && (
                                    <FormMessage className="pl-2 text-xs" />
                                 )}
                              </FormItem>
                           )}
                        />
                        {error && (
                           <div className="flex justify-center items-center gap-1 text-red-500">
                              <Icons.frown className="w-4 h-4" />
                              <p className="text-xs text-center  whitespace-pre-line font-medium">
                                 {error}
                              </p>
                           </div>
                        )}
                     </div>
                     <Button
                        disabled={isPending}
                        type="submit"
                        className="w-full"
                        variant="default"
                     >
                        <div className="flex items-center justify-center gap-2">
                           {isPending && <LoadingSpinner className="h-4 w-4" />}
                           {isPending ? '처리중...' : '회원가입'}
                        </div>
                     </Button>
                  </form>
               </Form>
            </CardContent>
         </Card>
      </section>
   )
}
