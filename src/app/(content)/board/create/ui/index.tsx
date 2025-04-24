'use client'

import { boardSchema } from '@/app/(content)/board/create/types/board-schema'
import { auth } from '@/shared/actions/auth-action'
import { Button } from '@/shared/shadcn/ui/button'
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormMessage,
} from '@/shared/shadcn/ui/form'
import { Input } from '@/shared/shadcn/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import type { BoardFormData } from '../types/board-types'
import BoardAccordion from './board-accordion'
import MarkDownEditor from './mark-down-editor'

export default function BoardPostForm() {
   const router = useRouter()
   const [isLoading, setIsLoading] = useState(true)
   const [isAuthenticated, setIsAuthenticated] = useState(false)
   const [showPassword, setShowPassword] = useState(false)
   const form = useForm<BoardFormData>({
      resolver: zodResolver(boardSchema),
      defaultValues: {
         nickname: '',
         password: '',
         subject: '',
         content: '',
      },
   })

   useEffect(() => {
      const checkAuth = async () => {
         const session = await auth()
         setIsAuthenticated(!!session)
         const nickname = session?.user_metadata?.nickname || ''
         form.setValue('nickname', nickname)
         setIsLoading(false)
      }
      checkAuth()
   }, [])

   const onSubmit = async (data: BoardFormData) => {
      console.log(data)
   }

   return (
      <section className="w-full px-3 py-2">
         <Form {...form}>
            <form
               className="w-full flex flex-col gap-2"
               onSubmit={form.handleSubmit(onSubmit)}
            >
               {/* 닉네임과 비밀번호 입력 필드 */}
               <div className="flex flex-col gap-2 ">
                  <div className="flex gap-2 sm:w-[50%] w-full ">
                     <FormField
                        control={form.control}
                        name="nickname"
                        render={({ field }) => (
                           <FormItem className="w-full max-w-[180px]">
                              <FormControl>
                                 <Input
                                    className="text-sm sm:text-base"
                                    placeholder="닉네임"
                                    disabled={isLoading || isAuthenticated}
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     {!isAuthenticated && (
                        <FormField
                           control={form.control}
                           name="password"
                           render={({ field }) => (
                              <FormItem className="w-full max-w-[180px]">
                                 <FormControl>
                                    <div className="relative ">
                                       <Input
                                          className="text-sm sm:text-base"
                                          type={
                                             showPassword ? 'text' : 'password'
                                          }
                                          placeholder="비밀번호"
                                          disabled={
                                             isLoading || isAuthenticated
                                          }
                                          {...field}
                                       />
                                       <Button
                                          type="button"
                                          variant="link"
                                          size="icon"
                                          className="absolute right-2 top-1/2 -translate-y-1/2"
                                          onClick={() =>
                                             setShowPassword(!showPassword)
                                          }
                                          disabled={
                                             isLoading || isAuthenticated
                                          }
                                       >
                                          {showPassword ? (
                                             <EyeOff className="h-4 w-4" />
                                          ) : (
                                             <Eye className="h-4 w-4" />
                                          )}
                                       </Button>
                                    </div>
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                     )}
                  </div>

                  <FormField
                     control={form.control}
                     name="subject"
                     render={({ field }) => (
                        <FormItem>
                           <FormControl>
                              <Input
                                 className="text-sm sm:text-base"
                                 placeholder="제목을 입력해주세요"
                                 disabled={isLoading}
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>

               <BoardAccordion />

               {/* 마크다운 입력 필드 */}
               <MarkDownEditor
                  name="content"
                  setValue={form.setValue}
                  register={form.register}
               />
               <div className="flex gap-6 justify-end my-2">
                  <Button type="button" onClick={() => router.back()}>
                     취소 하기
                  </Button>
                  <Button type="submit">제출 하기</Button>
               </div>
            </form>
         </Form>
      </section>
   )
}
