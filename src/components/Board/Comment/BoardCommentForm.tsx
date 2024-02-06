'use client'

import axios from 'axios'
import React, { useRef } from 'react'

interface BoardCommentFormProps {
   postid: string
   onCommentSubmit: () => void
}
export default function BoardCommentForm({
   postid,
   onCommentSubmit,
}: BoardCommentFormProps) {
   const commentFormRef = useRef(null)

   const handleComment = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const nickname = commentFormRef.current.nickname.value
      const password = commentFormRef.current.password.value
      const comment = commentFormRef.current.comment.value
      const timestamp = new Date().toISOString()

      const fetchSubmitComment = async (formData) => {
         try {
            const res = await axios.post(
               `${process.env.NEXT_PUBLIC_API_URL}comment`,
               formData,
            )
            console.log('submitComment', res.data)
            onCommentSubmit()
         } catch (error) {
            console.log(error)
         }
      }

      const clearFormFields = () => {
         commentFormRef.current.comment.value = ''
      }
      const formData = {
         postid,
         nickname,
         password,
         comment,
         timestamp,
         isPublic: true,
         like: 0,
         unlike: 0,
      }
      console.log(formData)
      try {
         await fetchSubmitComment(formData)
         clearFormFields()
      } catch (error) {
         console.log(error)
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
                  className="border p-1  max-w-40"
               />
               <input
                  name="password"
                  type="password"
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
