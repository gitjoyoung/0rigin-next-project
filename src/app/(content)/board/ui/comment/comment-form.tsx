'use client'

import { SupabaseBrowserClient } from '@/lib/supabase/supabase-browser-client'
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
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import type { IComment } from '../../types/comment-type'

interface Props {
   postId: string
   refetch: () => void
}

type CommentFormData = {
   content: string
   nickname: string
   password: string
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
const supabase = SupabaseBrowserClient()

export default function CommentForm({ postId, refetch }: Props) {
   const [isSubmitting, setIsSubmitting] = useState(false)
   const form = useForm<CommentFormData>({
      resolver: zodResolver(formCommentSchema),
      defaultValues: {
         content: '',
         nickname: '',
         password: '',
      },
   })

   const onSubmit = async (data: CommentFormData) => {
      if (isSubmitting) return

      setIsSubmitting(true)
      const commentObject: Partial<IComment> = {
         post_id: Number(postId),
         parent_id: null,
         content: data.content,
         author_id: null,
         nickname: data.nickname,
         password: data.password,
         is_approved: true,
         is_edited: false,
         is_guest: true,
         depth: 0,
      }

      try {
         const { error } = await supabase.from('comments').insert(commentObject)
         if (error) {
            alert(`댓글 오류 500`)
         } else {
            form.reset({
               content: '',
               nickname: data.nickname,
               password: data.password,
            })
            refetch()
         }
      } finally {
         setIsSubmitting(false)
      }
   }

   const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey && !isSubmitting) {
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

            <Button type="submit" disabled={isSubmitting}>
               {isSubmitting ? '제출 중...' : '댓글달기'}
            </Button>
         </form>
      </Form>
   )
}
