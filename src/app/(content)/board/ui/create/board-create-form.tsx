'use client'

import { ROUTES } from '@/constants/route'
import { createPost } from '@/service/board/post/updatePostApi'
import { useRouter } from 'next/navigation'
import BoardForm from '.'

export default function BoardCreateForm() {
   const { push } = useRouter() // 라우터

   // 글쓰기 폼 제출
   const handleFormSubmit = async (dataObject) => {
      await createPost(dataObject).then((postNumber) => {
         push(`${ROUTES.BOARD}/${postNumber}?page=1`)
      })
   }

   return (
      <>
         <BoardForm submitPost={handleFormSubmit} />
      </>
   )
}
