'use client'

import { ROUTES } from '@/constants/route'
import { fetchPostById } from '@/service/board/post/fetchPostApi'
import { updateEditPost } from '@/service/board/post/updatePostApi'
import type { Post } from '@/types/boardTypes'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import BoardForm from '.'

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
