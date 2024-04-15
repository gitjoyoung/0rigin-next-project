'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { ROUTES } from '@/constants/route'
import { createPost } from '@/app/api/board/post/updatePostApi'
import BoardForm from './BoardForm'

export default function BoardCreateForm() {
   const router = useRouter() // 라우터

   // 글쓰기 폼 제출
   const handleFormSubmit = async (dataObject) => {
      await createPost(dataObject).then((postNumber) => {
         router.push(`${ROUTES.BOARD}/1/${postNumber}`)
      })
   }

   return <BoardForm submitPost={handleFormSubmit} />
}
