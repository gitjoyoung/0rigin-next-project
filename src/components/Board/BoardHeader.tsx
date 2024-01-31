/* eslint-disable jsx-a11y/no-static-element-interactions */
'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
   title: string
}
export default function BoardHeader({ title }: Props) {
   const router = useRouter()
   return (
      <div className="my-3 flex justify-between">
         <div>
            <div
               onClick={() => router.refresh()}
               onKeyDown={() => {}}
               aria-label="Refresh"
            >
               <h1 className="text-3xl font-bold">{title} 게시판</h1>
            </div>
            <p>{title} 게시판입니다</p>
         </div>
         <div className="self-center">
            <button
               className="px-5 py-3"
               type="submit"
               onClick={() => router.push('/board/create')}
            >
               글쓰기
            </button>
         </div>
      </div>
   )
}
