'use client'

import {
   Tabs,
   TabsContent,
   TabsList,
   TabsTrigger,
} from '@/shared/shadcn/ui/tabs'
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
} from '@/shared/shadcn/ui/card'
import { Button } from '@/shared/shadcn/ui/button'
import { Input } from '@/shared/shadcn/ui/input'
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormMessage,
} from '@/shared/shadcn/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'

const findIdSchema = z.object({
   name: z.string().min(1, '이름을 입력해주세요'),
   phone: z.string().min(1, '전화번호를 입력해주세요'),
})

const findPasswordSchema = z.object({
   email: z.string().email('올바른 이메일을 입력해주세요'),
   name: z.string().min(1, '이름을 입력해주세요'),
})

export default function Forget() {
   const idForm = useForm({
      resolver: zodResolver(findIdSchema),
      defaultValues: {
         name: '',
         phone: '',
      },
   })

   const passwordForm = useForm({
      resolver: zodResolver(findPasswordSchema),
      defaultValues: {
         email: '',
         name: '',
      },
   })

   const onFindId = async (data) => {
      try {
         // 아이디 찾기 로직
         console.log('Finding ID with:', data)
      } catch (error) {
         console.error(error)
      }
   }

   const onFindPassword = async (data) => {
      try {
         // 비밀번호 찾기 로직
         console.log('Finding password with:', data)
      } catch (error) {
         console.error(error)
      }
   }

   return (
      <div className="flex mt-10 items-center justify-center">
         <Card className="w-[400px]">
            <CardHeader>
               <CardTitle className="text-center text-2xl">계정 찾기</CardTitle>
            </CardHeader>
            <CardContent>
               <Tabs defaultValue="id" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                     <TabsTrigger value="id">아이디 찾기</TabsTrigger>
                     <TabsTrigger value="password">비밀번호 찾기</TabsTrigger>
                  </TabsList>

                  <TabsContent value="id">
                     <Form {...idForm}>
                        <form
                           onSubmit={idForm.handleSubmit(onFindId)}
                           className="space-y-3"
                        >
                           <FormField
                              control={idForm.control}
                              name="name"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormControl>
                                       <Input placeholder="이름" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                 </FormItem>
                              )}
                           />

                           <FormField
                              control={idForm.control}
                              name="phone"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormControl>
                                       <Input
                                          placeholder="전화번호"
                                          {...field}
                                       />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                 </FormItem>
                              )}
                           />

                           <Button
                              type="submit"
                              className="w-full"
                              disabled={idForm.formState.isSubmitting}
                           >
                              {idForm.formState.isSubmitting ? (
                                 <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    처리 중...
                                 </>
                              ) : (
                                 '아이디 찾기'
                              )}
                           </Button>
                        </form>
                     </Form>
                  </TabsContent>

                  <TabsContent value="password">
                     <Form {...passwordForm}>
                        <form
                           onSubmit={passwordForm.handleSubmit(onFindPassword)}
                           className="space-y-3"
                        >
                           <FormField
                              control={passwordForm.control}
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
                                    <FormMessage className="text-xs" />
                                 </FormItem>
                              )}
                           />

                           <FormField
                              control={passwordForm.control}
                              name="name"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormControl>
                                       <Input placeholder="이름" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                 </FormItem>
                              )}
                           />

                           <Button
                              type="submit"
                              className="w-full"
                              disabled={passwordForm.formState.isSubmitting}
                           >
                              {passwordForm.formState.isSubmitting ? (
                                 <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    처리 중...
                                 </>
                              ) : (
                                 '비밀번호 찾기'
                              )}
                           </Button>
                        </form>
                     </Form>
                  </TabsContent>
               </Tabs>
            </CardContent>
         </Card>
      </div>
   )
}
