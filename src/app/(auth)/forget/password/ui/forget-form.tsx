'use client'

import { Button } from '@/shared/shadcn/ui/button'
import {
   Card,
   CardContent,
   CardFooter,
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
import { cn } from '@/shared/utils/cn'
import { Loader2 } from 'lucide-react'
import { usePasswordResetForm } from '../hooks/use-password-reset-hook'

export default function ForgetForm() {
   const { form, timer, emailStatus, isSubmitted, onFindPassword } =
      usePasswordResetForm()

   return (
      <div className="flex w-full items-center justify-center mx-1">
         <Card className="w-full max-w-md">
            <CardHeader>
               <CardTitle>이메일 입력</CardTitle>
            </CardHeader>
            <CardContent>
               <Form {...form}>
                  <form
                     onSubmit={form.handleSubmit(onFindPassword)}
                     className="space-y-4"
                  >
                     <div className="flex gap-2">
                        <FormField
                           control={form.control}
                           name="email"
                           render={({ field }) => (
                              <FormItem className="flex-1">
                                 <FormControl>
                                    <Input
                                       type="email"
                                       placeholder="이메일"
                                       {...field}
                                       disabled={timer !== null && timer > 0}
                                    />
                                 </FormControl>
                                 <FormMessage className="text-xs" />
                              </FormItem>
                           )}
                        />
                        <Button
                           type="submit"
                           size="sm"
                           className="whitespace-nowrap min-w-[65px]"
                           disabled={
                              form.formState.isSubmitting ||
                              (timer !== null && timer > 0)
                           }
                        >
                           {form.formState.isSubmitting ? (
                              <>
                                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                 처리 중...
                              </>
                           ) : timer !== null && timer > 0 ? (
                              `${timer}초`
                           ) : (
                              '보내기'
                           )}
                        </Button>
                     </div>
                  </form>
               </Form>
            </CardContent>
            <CardFooter className="flex justify-center">
               {emailStatus ? (
                  <h1
                     className={cn(
                        'text-sm',
                        emailStatus === 'success' && 'text-green-500',
                        emailStatus === 'error' && 'text-red-500',
                        emailStatus === 'idle' && 'text-gray-500',
                     )}
                  >
                     {emailStatus === 'success' &&
                        '이메일을 보냈습니다 이메일을 확인 해 주세요'}
                     {emailStatus === 'error' && '이메일을 다시 확인 해 주세요'}
                     {emailStatus === 'idle' && '이메일을 입력 해 주세요'}
                  </h1>
               ) : null}
            </CardFooter>
         </Card>
      </div>
   )
}
