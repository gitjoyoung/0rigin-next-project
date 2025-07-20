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
import { useCommentForm } from '../hooks/use-comment-form'

interface Props {
   postId: string
   refetch: () => void
}

export default function CommentForm({ postId, refetch }: Props) {
   const { form, isAuthed, createCommentMutation, onSubmit, handleKeyDown } =
      useCommentForm({ postId, refetch })

   return (
      <div className="my-2">
         <Form {...form}>
            <form
               onSubmit={form.handleSubmit(onSubmit)}
               className="flex flex-col gap-2"
            >
               <div className="flex gap-2 text-sm">
                  <FormField
                     control={form.control}
                     name="nickname"
                     render={({ field }) => (
                        <FormItem className="flex flex-col">
                           <FormControl>
                              <Input
                                 {...field}
                                 type="text"
                                 autoComplete="off"
                                 placeholder="닉네임"
                                 className="max-w-40 rounded-none"
                                 disabled={isAuthed}
                              />
                           </FormControl>
                           <FormMessage className="text-xs" />
                        </FormItem>
                     )}
                  />

                  {!isAuthed && (
                     <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                           <FormItem className="flex flex-col">
                              <FormControl>
                                 <Input
                                    {...field}
                                    type="password"
                                    maxLength={10}
                                    autoComplete="off"
                                    placeholder="비밀번호"
                                    className="max-w-40 rounded-none"
                                 />
                              </FormControl>
                              <FormMessage className="text-xs" />
                           </FormItem>
                        )}
                     />
                  )}
               </div>

               <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                     <FormItem className="flex flex-col">
                        <FormControl>
                           <Textarea
                              {...field}
                              className="border rounded-none"
                              placeholder="댓글 입력"
                              onKeyDown={handleKeyDown}
                           />
                        </FormControl>
                        <FormMessage className="text-xs" />
                     </FormItem>
                  )}
               />

               <Button type="submit" disabled={createCommentMutation.isPending}>
                  {createCommentMutation.isPending ? '제출 중...' : '댓글달기'}
               </Button>
            </form>
         </Form>
      </div>
   )
}
