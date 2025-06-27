'use client'

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
import { z } from 'zod'

interface Props {
   postId: string
   refetch: () => void
}

// 폼용 간소화된 commentSchema 생성
const formCommentSchema = z.object({
   content: z.string().min(1, '댓글 내용을 입력해주세요.'),
   nickname: z.string().min(2, '닉네임은 2자 이상이어야 합니다.'),
   password: z
      .string()
      .min(4, '비밀번호는 4자 이상이어야 합니다.')
      .max(10, '비밀번호는 10자 이하이어야 합니다.')
      .regex(
         /^[A-Za-z\d가-힣ㄱ-ㅎㅏ-ㅣ]+$/,
         '비밀번호는 문자, 숫자만 가능합니다',
      ),
})

type CommentFormData = z.infer<typeof formCommentSchema>

// 클라이언트에서 사용할 댓글 생성 함수
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
   const form = useForm<CommentFormData>({
      resolver: zodResolver(formCommentSchema),
      defaultValues: {
         content: '',
         nickname: '',
         password: '',
      },
   })

   const mutation = useMutation({
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
         password: data.password,
         is_guest: true,
         depth: 0,
      }

      mutation.mutate(commentData)
   }

   const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey && !mutation.isPending) {
         e.preventDefault()
         form.handleSubmit(onSubmit)()
      }
   }

   return (
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
                           />
                        </FormControl>
                        <FormMessage className="text-xs" />
                     </FormItem>
                  )}
               />

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

            <Button type="submit" disabled={mutation.isPending}>
               {mutation.isPending ? '제출 중...' : '댓글달기'}
            </Button>
         </form>
      </Form>
   )
}
