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
import { Textarea } from '@/shared/shadcn/ui/textarea'
import { cn } from '@/shared/utils/cn'
import { compressImage } from '@/shared/utils/compress-image'
import { markdownToSanitizedHTML } from '@/shared/utils/validators/board/formatSanized'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { Eye, EyeOff, Upload } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import MarkDownEditor from './mark-down-editor'

const supabase = SupabaseBrowserClient()

export default function BoardPostForm() {
   const router = useRouter()
   const [isLoading, setIsLoading] = useState(true)
   const [isAuthenticated, setIsAuthenticated] = useState(false)
   const [showPassword, setShowPassword] = useState(false)
   const [uploading, setUploading] = useState(false)

   const form = useForm<BoardFormType>({
      resolver: zodResolver(boardSchema),
      defaultValues: {
         nickname: '',
         password: '',
         title: '',
         content: '',
         summary: '',
         thumbnail: '/images/compressed_newYear.image_webp',
      },
   })

   useEffect(() => {
      const initializeForm = async () => {
         try {
            const session = await auth()
            const isAuth = !!session

            setIsAuthenticated(isAuth)

            if (isAuth && session) {
               const nickname = session.user_metadata?.nickname || ''
               form.setValue('nickname', nickname)
            }
         } catch (error) {
            console.error('인증 확인 중 오류:', error)
         } finally {
            setIsLoading(false)
         }
      }

      initializeForm()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return

      setUploading(true)

      try {
         const result = await compressImage(file, {
            fileType: 'image/jpeg',
            maxSizeMB: 0.1,
            maxWidthOrHeight: 1920,
         })
         if (result.status === 'error') {
            alert('이미지 압축에 실패했습니다.')
            setUploading(false)
            return
         }
         const timestamp = dayjs().format('YYYYMMDDHHmmss')
         const fileExtension = file.name.split('.').pop()?.toLowerCase()
         const newFileName = `public/thumbnail_${timestamp}.${fileExtension}`

         const { data, error } = await supabase.storage
            .from('images')
            .upload(newFileName, result.file, {
               cacheControl: '3600',
               upsert: false,
               contentType: result.file.type,
            })

         if (error) throw error

         const {
            data: { publicUrl },
         } = supabase.storage.from('images').getPublicUrl(data.path)

         form.setValue('thumbnail', publicUrl)
         setUploading(false)
      } catch (error) {
         console.error('이미지 업로드 오류:', error)
         alert('이미지 업로드에 실패했습니다.')
         setUploading(false)
      }
   }

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

               {/* <BoardAccordion /> */}

               <div className="flex justify-between gap-2 flex-wrap flex-1 w-full min-h-[80px]">
                  <FormField
                     control={form.control}
                     name="summary"
                     render={({ field }) => (
                        <FormItem className="w-full max-w-[650px] min-w-[300px]">
                           <FormControl>
                              <Textarea
                                 id="summary"
                                 maxLength={155}
                                 className="text-sm font-sans "
                                 placeholder="요약"
                                 {...field}
                              />
                           </FormControl>
                        </FormItem>
                     )}
                  />
                  <div className="flex flex-1 font-sans gap-2 items-center border w-full min-w-[300px] max-w-[650px] p-2 rounded-md">
                     <div className="text-sm sm:text-base flex flex-col gap-1 w-full min-h-[80px] overflow-hidden">
                        <h1
                           className="font-bold text-xl overflow-hidden text-ellipsis line-clamp-2 
                           whitespace-pre-wrap text-[##3d00b3] dark:text-[#7EAAFF] min-h-[20px] break-words"
                        >
                           {form.watch('title') || '제목을 미리보기'}
                        </h1>
                        <p className="text-sm overflow-hidden text-ellipsis line-clamp-3 whitespace-pre-wrap text-[#767676] dark:text-[#CDCDCD] break-words">
                           {form.watch('summary') || '요약내용 미리보기'}
                        </p>
                     </div>
                     <div className="relative group w-[75px] h-[75px] flex-shrink-0">
                        <Image
                           src={form.watch('thumbnail')}
                           alt="thumbnail"
                           fill
                           sizes="75px"
                           className="rounded-md object-cover"
                        />
                        <label
                           htmlFor="thumbnail-upload"
                           className={cn(
                              `absolute inset-0 flex items-center justify-center rounded-md cursor-pointer transition-opacity duration-200 ${
                                 uploading
                                    ? 'opacity-100 bg-black/30'
                                    : 'opacity-0 group-hover:opacity-100 group-hover:bg-black/30'
                              }`,
                           )}
                        >
                           {uploading ? (
                              <div className="w-6 h-6 border-2 border-slate-100 border-t-transparent rounded-full animate-spin" />
                           ) : (
                              <Upload className="w-6 h-6 text-slate-100" />
                           )}
                        </label>
                        <input
                           id="thumbnail-upload"
                           type="file"
                           accept="image/*"
                           className="hidden"
                           onChange={handleImageUpload}
                           disabled={uploading}
                        />
                     </div>
                  </div>
               </div>
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
