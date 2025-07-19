'use client'

import { useAuthState } from '@/app/providers/auth-client-provider'
import type { CommentCreate } from '@/entities/comment'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import {
   createFormSchema,
   type CommentFormData,
} from './schema/comment-form-schema'

interface Props {
   postId: string
   refetch: () => void
}

async function createCommentApi(data: CommentCreate) {
   const response = await fetch('/api/comment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
   })
   if (!response.ok) {
      throw new Error('댓글 작성에 실패했습니다.')
   }
   return response.json()
}

export default function CommentForm({ postId, refetch }: Props) {
   const { status, profile } = useAuthState()
   const isAuthed = status === 'authed'

   const form = useForm<CommentFormData>({
      resolver: zodResolver(createFormSchema(isAuthed)),
      defaultValues: {
         content: '',
         nickname: profile?.nickname ?? '',
         password: '',
      },
   })

   const createCommentMutation = useMutation({
      mutationFn: createCommentApi,
      onSuccess: () => {
         form.reset()
         refetch()
      },
      onError: (error) => {
         console.error('댓글 작성 오류:', error)
         alert('댓글 작성에 실패했습니다.')
      },
   })

   const onSubmit = (data: CommentFormData) => {
      const commentData: CommentCreate = {
         post_id: Number(postId),
         nickname: data.nickname,
         content: data.content,
         password: isAuthed ? null : data.password,
         author_id: isAuthed ? profile?.id : null,
         is_guest: !isAuthed,
         depth: 0,
      }

      createCommentMutation.mutate(commentData)
   }

   const handleKeyDown = (e: React.KeyboardEvent) => {
      if (
         e.key === 'Enter' &&
         !e.shiftKey &&
         !createCommentMutation.isPending
      ) {
         e.preventDefault()
         form.handleSubmit(onSubmit)()
      }
   }

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
