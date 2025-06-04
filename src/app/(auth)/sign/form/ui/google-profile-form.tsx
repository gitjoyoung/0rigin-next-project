'use client'

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
import { Icons } from '@/shared/ui/icons'
import { LoadingSpinner } from '@/shared/ui/spinner/loading-spinner'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useGoogleProfile } from '../hook/useGoogleProfile'
import GenderRadioButton from './gender-radio-button'

// 구글 사용자용 간단한 스키마
const GoogleProfileSchema = z.object({
   nickname: z
      .string()
      .min(2, { message: '닉네임은 2글자 이상이어야 합니다.' }),
   gender: z.enum(['man', 'women'], { required_error: '성별을 선택해주세요.' }),
})

interface GoogleProfileFormProps {
   email: string
}

export default function GoogleProfileForm({ email }: GoogleProfileFormProps) {
   const { error, mutate, isPending } = useGoogleProfile()

   const form = useForm<z.infer<typeof GoogleProfileSchema>>({
      resolver: zodResolver(GoogleProfileSchema),
      defaultValues: {
         nickname: '',
         gender: 'man',
      },
      mode: 'onChange',
   })

   const handleSubmit = (data: z.infer<typeof GoogleProfileSchema>) => {
      mutate({
         nickname: data.nickname,
         gender: data.gender,
      })
   }

   return (
      <section className="w-full flex justify-center">
         {isPending && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
               <div className="flex flex-col items-center gap-4">
                  <Icons.refreshCcw className="h-8 w-8 animate-spin text-white" />
                  <p className="text-white">프로필 생성 중...</p>
               </div>
            </div>
         )}

         <Card className="w-full max-w-[350px]">
            <CardHeader className="flex flex-col">
               <CardTitle className="text-2xl">0rigin 회원가입</CardTitle>
            </CardHeader>

            <CardContent>
               <Form {...form}>
                  <form
                     onSubmit={form.handleSubmit(handleSubmit)}
                     className="space-y-4"
                  >
                     {/* 이메일 (읽기 전용) */}
                     <div>
                        <Input value={email} disabled placeholder="이메일" />
                        <div className="flex px-2 items-center gap-1 text-xs text-muted-foreground mt-1">
                           <Icons.google className="h-4 w-4" />
                           <span className="text-green-500">
                              Google 계정으로 로그인되었습니다.
                           </span>
                        </div>
                     </div>

                     {/* 성별 선택 */}
                     <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                           <GenderRadioButton disabled={isPending} {...field} />
                        )}
                     />

                     {/* 닉네임 입력 */}
                     <FormField
                        control={form.control}
                        name="nickname"
                        render={({ field, fieldState }) => (
                           <FormItem>
                              <FormControl>
                                 <Input
                                    disabled={isPending}
                                    placeholder="닉네임을 입력하세요"
                                    maxLength={12}
                                    {...field}
                                 />
                              </FormControl>
                              {fieldState.error && (
                                 <FormMessage className="text-xs text-red-500" />
                              )}
                           </FormItem>
                        )}
                     />

                     {/* 에러 메시지 */}
                     {error && (
                        <div className="flex justify-center items-center gap-1 text-red-500">
                           <Icons.frown className="w-4 h-4" />
                           <p className="text-xs text-center">{error}</p>
                        </div>
                     )}

                     {/* 제출 버튼 */}
                     <Button
                        disabled={isPending}
                        type="submit"
                        className="w-full"
                        variant="default"
                     >
                        <div className="flex items-center justify-center gap-2">
                           {isPending && <LoadingSpinner className="h-4 w-4" />}
                           {isPending ? '생성 중...' : '프로필 완성하기'}
                        </div>
                     </Button>
                  </form>
               </Form>
            </CardContent>
         </Card>
      </section>
   )
}
