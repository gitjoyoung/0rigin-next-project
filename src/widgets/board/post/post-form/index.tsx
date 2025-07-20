'use client'

import type { Profile } from '@/entities/profile'
import { Button } from '@/shared/shadcn/ui/button'
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormMessage,
} from '@/shared/shadcn/ui/form'
import { Input } from '@/shared/shadcn/ui/input'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useState } from 'react'
import { UseFormReturn, useForm } from 'react-hook-form'
import LoadingModal from '../../common/loading-modal'
import MarkDownEditor from '../../common/mark-down-editor'
import MarkDownTip from '../../common/markdown-tip'
import type { BoardFormType } from '../../common/schema/board-schema'
import {
   extractFirstImageUrl,
   removeImagesAndMarkdown,
} from '../../common/utils/markdown-util'

interface BoardFormProps {
   form: UseFormReturn<BoardFormType>
   isSubmitting: boolean
   onSubmit: (data: BoardFormType) => void
   profile?: Profile | null
   submitLabel?: string
}

export default function PostForm({
   form: externalForm,
   isSubmitting,
   onSubmit,
   profile,
   submitLabel,
}: BoardFormProps) {
   const [passwordVisible, setPasswordVisible] = useState(false)

   // 외부에서 form이 전달되지 않으면 내부에서 생성
   const internalForm = useForm<BoardFormType>({
      defaultValues: {
         title: '',
         content: '',
         thumbnail: undefined,
         summary: undefined,
         nickname: profile?.nickname || '',
         password: '',
      },
   })

   const form = externalForm || internalForm

   return (
      <section className="w-full py-2">
         <LoadingModal isOpen={isSubmitting} />
         <Form {...form}>
            <form
               className="w-full flex flex-col gap-2"
               onSubmit={form.handleSubmit(onSubmit)}
            >
               {/* 닉네임 입력 필드 */}
               <div className="flex gap-2">
                  <FormField
                     control={form.control}
                     name="nickname"
                     render={({ field }) => (
                        <FormItem className="w-full max-w-[180px]">
                           <FormControl>
                              <Input
                                 className="text-sm sm:text-base"
                                 placeholder="닉네임"
                                 disabled={!!profile}
                                 {...field}
                                 value={profile?.nickname ?? field.value}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  {!profile && (
                     <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => {
                           return (
                              <FormItem className="w-full max-w-[180px]">
                                 <FormControl>
                                    <div className="relative">
                                       <Input
                                          className="text-sm sm:text-base pr-10"
                                          placeholder="비밀번호"
                                          minLength={4}
                                          maxLength={8}
                                          type={
                                             passwordVisible
                                                ? 'text'
                                                : 'password'
                                          }
                                          autoComplete="new-password"
                                          {...field}
                                       />
                                       <Button
                                          type="button"
                                          size="icon"
                                          variant="ghost"
                                          className="absolute right-0 top-1/2 -translate-y-1/2"
                                          onClick={() =>
                                             setPasswordVisible((v) => !v)
                                          }
                                       >
                                          {passwordVisible ? (
                                             <EyeIcon className="w-4 h-4" />
                                          ) : (
                                             <EyeOffIcon className="w-4 h-4" />
                                          )}
                                       </Button>
                                    </div>
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )
                        }}
                     />
                  )}
               </div>
               {/* 제목 입력 필드 */}
               <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                     <FormItem>
                        <FormControl>
                           <Input
                              className="text-sm sm:text-base"
                              placeholder="제목을 입력해주세요"
                              disabled={isSubmitting}
                              {...field}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />

               {/* 구글 검색 결과 스타일 프리뷰 */}
               <div className="flex items-center gap-4 w-full max-w-[500px] bg-white dark:bg-neutral-900 border rounded-lg shadow-sm p-3 my-2">
                  {/* 썸네일 (오른쪽, 75x75) - 이미지가 있을 때만 */}
                  <div className="flex flex-1 min-w-0 flex-col">
                     <div className="font-bold text-base sm:text-lg text-gray-900 dark:text-white truncate mb-1">
                        {(form.watch('title') || '제목 미리보기').slice(0, 30)}
                     </div>
                     <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-300 line-clamp-4 break-words">
                        {(
                           removeImagesAndMarkdown(form.watch('content')) ||
                           '내용 미리보기'
                        ).slice(0, 80)}
                     </div>
                  </div>
                  {extractFirstImageUrl(form.watch('content')) && (
                     <div className="flex-shrink-0 w-[75px] h-[75px] rounded overflow-hidden bg-gray-100 border flex items-center justify-center ml-2">
                        <img
                           src={extractFirstImageUrl(form.watch('content'))}
                           alt="썸네일 미리보기"
                           className="object-cover w-full h-full"
                        />
                     </div>
                  )}
               </div>

               {/* 마크다운 사용법 */}
               <MarkDownTip />

               {/* 마크다운 입력 필드 */}
               <MarkDownEditor
                  name="content"
                  setValue={form.setValue}
                  register={form.register}
                  initialValue={form.watch('content') || ''}
               />

               <div className="flex gap-6 justify-end my-2 items-center">
                  <Button
                     type="button"
                     size="lg"
                     className="bg-gray-400 hover:bg-gray-500"
                     onClick={() => window.history.back()}
                     disabled={isSubmitting}
                  >
                     취소
                  </Button>
                  <Button size="lg" type="submit" disabled={isSubmitting}>
                     {submitLabel}
                  </Button>
               </div>
            </form>
         </Form>
      </section>
   )
}
