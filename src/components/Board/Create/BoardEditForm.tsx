'use client'

import { updateEditPost } from '@/app/api/board/post/updatePostApi'
import { ROUTES } from '@/constants/route'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { fetchPostById } from '@/app/api/board/post/fetchPostApi'
import { Post } from '@/types/boardTypes'
import BoardForm from './BoardForm'

interface Props {
   postId: string
}

export default function BoardEditForm({ postId }: Props) {
   const { push } = useRouter()
   // 글쓰기 내용을 저장하는 state
   const [editData, seteEitData] = useState<Post>() // 글쓰기 폼의 내용을 저장하는 state
   useEffect(() => {
      const postData = async () => {
         const res: Post = await fetchPostById(postId)
         seteEitData(res)
      }
      postData()
   }, [postId])
   // 글쓰기 폼 제출
   const handleFormSubmit = async (dataObject) => {
      await updateEditPost(postId, dataObject).then((postNumber) => {
         push(`${ROUTES.BOARD}/${postNumber}?page=1`)
      })
   }
   return <BoardForm editData={editData} submitPost={handleFormSubmit} />
}
