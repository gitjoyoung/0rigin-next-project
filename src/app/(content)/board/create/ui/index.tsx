'use client'

import {
   boardSchema,
   type BoardFormType,
} from '@/app/(content)/board/create/types/board-schema'
import { SupabaseBrowserClient } from '@/lib/supabase/supabase-browser-client'
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
import { markdownToSanitizedHTML } from '@/shared/utils/validators/board/formatSanized'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import BoardAccordion from './board-accordion'
import MarkDownEditor from './mark-down-editor'

const supabase = SupabaseBrowserClient()

export default function BoardPostForm() {
   const router = useRouter()
   const [isLoading, setIsLoading] = useState(true)
   const [isAuthenticated, setIsAuthenticated] = useState(false)
   const [showPassword, setShowPassword] = useState(false)

   const form = useForm<BoardFormType>({
      resolver: zodResolver(boardSchema),
      defaultValues: {
         nickname: '',
         password: '',
         title: '',
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
   const onSubmit = async (data: BoardFormType) => {
      console.log('글쓰기 데이터', data)

      // 마크다운을 HTML로 변환
      const markdownContent = data.content
      const htmlContent = await markdownToSanitizedHTML(markdownContent)

      const { data: postData, error } = await supabase.from('posts').insert({
         nickname: data.nickname,
         password: data.password,
         title: data.title,
         content: {
            markdown: markdownContent,
            html: htmlContent,
         },
      })
      if (error) {
         alert('글쓰기 오류' + JSON.stringify(error.message))
      } else {
         alert('글쓰기 성공')
         router.push('/board')
      }
   }

   return (
      <section className="w-full py-2">
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
                     name="title"
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
               <div className="flex gap-6 justify-end my-2 item">
                  <Button
                     type="button"
                     size="lg"
                     className="bg-gray-400 hover:bg-gray-500"
                     onClick={() => router.back()}
                  >
                     취소
                  </Button>
                  <Button size="lg" type="submit">
                     제출 하기
                  </Button>
               </div>
            </form>
         </Form>
      </section>
   )
}
