'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { ROUTES } from '@/constants/route'
import { createPost } from '@/app/api/board/post/updatePostApi'
import BoardForm from './BoardForm'

export default function BoardCreateForm() {
   const { push } = useRouter() // 라우터

   // 글쓰기 폼 제출
   const handleFormSubmit = async (dataObject) => {
      await createPost(dataObject).then((postNumber) => {
         push(`${ROUTES.BOARD}/${postNumber}?page=1`)
      })
   }

   return <BoardForm submitPost={handleFormSubmit} />
}
