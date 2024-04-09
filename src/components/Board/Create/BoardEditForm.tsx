'use client'

import { updateEditPost } from '@/app/api/board/post/updatePostApi'
import { ROUTES } from '@/constants/route'
import { CreatePostData } from '@/types/boardTypes'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import BoardForm from './BoardForm'

interface Props {
   postId: string
   editData: CreatePostData
}

export default function BoardEditForm({ postId, editData }: Props) {
   const { push } = useRouter()
   // 글쓰기 내용을 저장하는 state
   const [content, setContent] = useState(editData.markdown || '') // 글쓰기 폼의 내용을 저장하는 state

   // 글쓰기 폼 제출
   const handleFormSubmit = async (dataObject) => {
      await updateEditPost(postId, dataObject).then((postNumber) => {
         push(`${ROUTES.BOARD}/1/${postNumber}`)
      })
   }
   return (
      <BoardForm
         content={content}
         setContent={setContent}
         submitPost={handleFormSubmit}
      />
   )
}
