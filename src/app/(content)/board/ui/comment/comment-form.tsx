'use client'

import { commentSchema } from '@/schema/commentSchema'
import { Button } from '@/shared/shadcn/ui/button'
import { Input } from '@/shared/shadcn/ui/input'
import { Textarea } from '@/shared/shadcn/ui/textarea'
import type { CreateCommentData } from '@/types/commentTypes'
import { useRouter } from 'next/navigation'
import React, { useRef } from 'react'

interface Props {
   postId: string
}
export default function CommentForm({ postId }: Props) {
   // 댓글 폼 참조
   const commentFormRef = useRef(null)
   const { refresh } = useRouter()

   // 필드 초기화
   const clearFormFields = () => {
      commentFormRef.current.comment.value = ''
   }
   const handleComment = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const nickname = commentFormRef.current.nickname.value
      const password = commentFormRef.current.password.value
      const comment = commentFormRef.current.comment.value

      const commentObject: CreateCommentData = {
         postId,
         nickname,
         password,
         comment,
      }
      const result = commentSchema.safeParse(commentObject)
      if (result.success === false) {
         alert(result.error)
         return
      }
      clearFormFields()
   }

   return (
      <div className="py-2 ">
         <form
            ref={commentFormRef}
            onSubmit={handleComment}
            className="flex flex-col gap-2"
         >
            <div className="flex  gap-2 text-sm ">
               <Input
                  name="nickname"
                  type="text"
                  autoComplete="off"
                  placeholder="닉네임"
                  className="max-w-40 rounded-none"
               />
               <Input
                  name="password"
                  type="password"
                  maxLength={10}
                  autoComplete="off"
                  placeholder="비밀번호"
                  className="max-w-40 rounded-none"
               />
            </div>

            <Textarea
               name="comment"
               className=" border rounded-none"
               placeholder="댓글 입력"
            />
            <Button type="submit">댓글달기</Button>
         </form>
      </div>
   )
}
