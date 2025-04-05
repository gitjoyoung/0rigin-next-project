'use client'

import { useRouter } from 'next/navigation'
import BoardForm from '.'

export default function BoardCreateForm() {
   const { push } = useRouter() // 라우터

   // 글쓰기 폼 제출
   const handleFormSubmit = async (dataObject) => {}

   return (
      <>
         <BoardForm submitPost={handleFormSubmit} />
      </>
   )
}
