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
import { useBoardForm } from '../../create/hook'
import { useUpdatePost } from '../hook'
import LoadingModal from '../../create/ui/loading-modal'
import MarkDownEditor from '../../create/ui/mark-down-editor'
import MarkDownTip from '../../create/ui/markdown-tip'
import ThumbnailUpload from '../../create/ui/thumbnail-upload'

interface Props {
   category: string
   post: any
   postId: string
}

export default function UpdatePostForm({ category, post, postId }: Props) {
   const { uploading, isSubmittingPost, uploadImageMutation, onSubmit } =
      useUpdatePost({ category, postId })

   const { form, setThumbnail } = useBoardForm({
      userData: { user: true },
      defaultValues: {
         title: post.title || '',
         content: post.content?.markdown || '',
         summary: post.summary || '',
         thumbnail: post.thumbnail || '',
      },
   })

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
                        <h1 className="font-bold text-xl overflow-hidden text-ellipsis line-clamp-2 whitespace-pre-wrap text-[##3d00b3] dark:text-[#7EAAFF] min-h-[20px] break-words">
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
               <MarkDownTip />
               <MarkDownEditor
                  name="content"
                  setValue={form.setValue}
                  register={form.register}
                  initialValue={post.content?.markdown || ''}
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
                     수정 하기
                  </Button>
               </div>
            </form>
         </Form>
      </section>
   )
}
