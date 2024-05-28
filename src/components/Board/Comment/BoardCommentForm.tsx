'use client'

import { addComment } from '@/app/api/board/commentApi'
import { CreateCommentData } from '@/types/commentTypes'
import React, { useRef } from 'react'
import { commentSchema } from './schma/commentSchema'

interface Props {
   postId: string
}
export default function BoardCommentForm({ postId }: Props) {
   // 댓글 폼 참조
   const commentFormRef = useRef(null)

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
      const response = await addComment(postId, commentObject)
      if (response) {
         clearFormFields()
      }
   }

   return (
      <div className="p-2 border border-black">
         <form
            ref={commentFormRef}
            onSubmit={handleComment}
            className="flex flex-col gap-2"
         >
            <div className="flex  gap-2 text-sm ">
               <input
                  name="nickname"
                  type="text"
                  placeholder="닉네임"
                  autoComplete="off"
                  className="border p-1  max-w-40"
               />
               <input
                  name="password"
                  type="password"
                  autoComplete="off"
                  placeholder="비밀번호"
                  className="border p-1 w-full max-w-40"
               />
            </div>

            <textarea
               name="comment"
               className="w-full border p-2"
               placeholder="댓글 입력"
            />
            <button className="p-1" type="submit">
               댓글달기
            </button>
         </form>
      </div>
   )
}
