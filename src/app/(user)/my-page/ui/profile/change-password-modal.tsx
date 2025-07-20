'use client'

import { useToast } from '@/shared/hooks/use-toast'
import { SupabaseBrowserClient } from '@/shared/lib/supabase/supabase-browser-client'
import { Button } from '@/shared/shadcn/ui/button'
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from '@/shared/shadcn/ui/dialog'
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
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const changePasswordSchema = z
   .object({
      currentPassword: z.string().min(1, '현재 비밀번호를 입력해주세요.'),
      newPassword: z
         .string()
         .min(8, '비밀번호는 8자 이상이어야 합니다.')
         .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            '비밀번호는 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.',
         ),
      confirmPassword: z.string().min(1, '비밀번호 확인을 입력해주세요.'),
   })
   .refine((data) => data.newPassword === data.confirmPassword, {
      message: '비밀번호가 일치하지 않습니다.',
      path: ['confirmPassword'],
   })

type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>

interface ChangePasswordModalProps {
   open: boolean
   onOpenChange: (open: boolean) => void
}

async function changePassword({
   currentPassword,
   newPassword,
}: {
   currentPassword: string
   newPassword: string
}) {
   const supabase = await SupabaseBrowserClient()
   const { error } = await supabase.auth.updateUser({
      password: newPassword,
   })

   if (error) {
      throw new Error('비밀번호 변경에 실패했습니다.')
   }
}

export function ChangePasswordModal({
   open,
   onOpenChange,
}: ChangePasswordModalProps) {
   const { toast } = useToast()

   const form = useForm<ChangePasswordFormValues>({
      resolver: zodResolver(changePasswordSchema),
      defaultValues: {
         currentPassword: '',
         newPassword: '',
         confirmPassword: '',
      },
   })

   const changePasswordMutation = useMutation({
      mutationFn: changePassword,
      onSuccess: () => {
         toast({
            title: '비밀번호가 변경되었습니다.',
            description: '다음 로그인부터 새로운 비밀번호를 사용하세요.',
         })
         onOpenChange(false)
         form.reset()
      },
      onError: (error) => {
         toast({
            title: '오류가 발생했습니다.',
            description: error.message,
            variant: 'destructive',
         })
      },
   })

   function onSubmit(data: ChangePasswordFormValues) {
      changePasswordMutation.mutate({
         currentPassword: data.currentPassword,
         newPassword: data.newPassword,
      })
   }

   return (
      <Dialog open={open} onOpenChange={onOpenChange}>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>비밀번호 변경</DialogTitle>
               <DialogDescription>
                  새로운 비밀번호를 입력해주세요.
               </DialogDescription>
            </DialogHeader>
            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
               >
                  <FormField
                     control={form.control}
                     name="currentPassword"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>현재 비밀번호</FormLabel>
                           <FormControl>
                              <Input
                                 type="password"
                                 placeholder="현재 비밀번호를 입력하세요"
                                 autoComplete="current-password"
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="newPassword"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>새 비밀번호</FormLabel>
                           <FormControl>
                              <Input
                                 type="password"
                                 placeholder="새 비밀번호를 입력하세요"
                                 autoComplete="new-password"
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
                                 autoComplete="new-password"
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <DialogFooter>
                     <Button
                        type="button"
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                     >
                        취소
                     </Button>
                     <Button
                        type="submit"
                        disabled={changePasswordMutation.isPending}
                     >
                        {changePasswordMutation.isPending
                           ? '변경중...'
                           : '변경하기'}
                     </Button>
                  </DialogFooter>
               </form>
            </Form>
         </DialogContent>
      </Dialog>
   )
}
