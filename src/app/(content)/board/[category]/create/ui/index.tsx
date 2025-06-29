'use client'

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
import { Eye, EyeOff } from 'lucide-react'
import { useBoardForm, useBoardPost } from '../hook'
import LoadingModal from './loading-modal'
import MarkDownEditor from './mark-down-editor'
import MarkDownTip from './markdown-tip'
import ThumbnailUpload from './thumbnail-upload'

interface Props {
   category: string
   userProfile?: any
   editPostData?: any
}

export default function BoardPostForm({
   category,
   userProfile,
   editPostData,
}: Props) {
   // 게시글 작성 로직 훅
   const { uploading, isSubmittingPost, uploadImageMutation, onSubmit } =
      useBoardPost({
         category,
         userProfile,
         post: editPostData,
      })

   // 폼 상태 관리 훅 (기존 데이터로 초기화)
   const {
      form,
      showPassword,
      setShowPassword,
      isAuthenticated,
      setThumbnail,
   } = useBoardForm({
      userData: userProfile,
      initialData: editPostData
         ? {
              title: editPostData.title,
              content: editPostData.content,
              summary: editPostData.summary || '',
              nickname: editPostData.nickname,
              password: '',
              thumbnail: editPostData.thumbnail || '',
           }
         : undefined,
   })

   // 이미지 업로드 처리
   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      const file = e.target.files?.[0]
      if (!file) return

      uploadImageMutation.mutate(file, {
         onSuccess: (publicUrl) => {
            setThumbnail(publicUrl)
         },
      })
   }

   const thumbnailUrl = form.watch('thumbnail')

   return (
      <section className="w-full py-2">
         <LoadingModal isOpen={isSubmittingPost} />
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
                                    disabled={isAuthenticated}
                                    {...field}
                                    value={
                                       isAuthenticated
                                          ? userProfile?.nickname || '익명'
                                          : field.value
                                    }
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
                              {...field}
                              disabled={isSubmittingPost}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />

               {/* 요약 입력 필드 */}
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
                           {form.watch('title') || '제목 미리보기'}
                        </h1>
                        <p className="text-sm overflow-hidden text-ellipsis line-clamp-3 whitespace-pre-wrap text-[#767676] dark:text-[#CDCDCD] break-words">
                           {form.watch('summary') || '요약내용 미리보기'}
                        </p>
                     </div>
                     <ThumbnailUpload
                        thumbnailUrl={thumbnailUrl}
                        uploading={uploading}
                        onImageUpload={handleImageUpload}
                     />
                  </div>
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
               <div className="flex gap-6 justify-end my-2 item">
                  <Button
                     type="button"
                     size="lg"
                     className="bg-gray-400 hover:bg-gray-500"
                     onClick={() => window.history.back()}
                     disabled={isSubmittingPost}
                  >
                     취소
                  </Button>
                  <Button size="lg" type="submit" disabled={isSubmittingPost}>
                     {editPostData ? '수정 하기' : '제출 하기'}
                  </Button>
               </div>
            </form>
         </Form>
      </section>
   )
}
