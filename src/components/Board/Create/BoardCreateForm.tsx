'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { ROUTES } from '@/constants/route'
import { createPost } from '@/app/api/board/post/updatePostApi'
import { useSession } from 'next-auth/react'
import BoardForm from './BoardForm'

export default function BoardCreateForm() {
   const { data: session } = useSession() // 세션 정보
   const router = useRouter() // 라우터
   const [content, setContent] = useState('') // 글쓰기 폼의 내용을 저장하는 state

   // 글쓰기 폼 제출
   const handleFormSubmit = async (dataObject) => {
      await createPost(dataObject).then((postNumber) => {
         router.push(`${ROUTES.BOARD}/1/${postNumber}`)
      })
   }

   return (
      <BoardForm
         content={content}
         setContent={setContent}
         submitPost={handleFormSubmit}
         session={session}
      />
   )
}
