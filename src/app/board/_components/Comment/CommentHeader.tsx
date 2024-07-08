'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

interface Props {
   length: number
}

export default function CommentHeader({ length }: Props) {
   const router = useRouter()
   return (
      <div className="border-b border-t border-black flex justify-between text-xs  p-1">
         <div className="flex text-gray-700 items-center ">
            <h1>전체 코멘트</h1>
            <span className="text-red-500">{length && length}</span>
            <span>개</span>
         </div>
         <button
            type="button"
            onClick={() => router.refresh()}
            className="text-blue-500"
         >
            새로고침
         </button>
      </div>
   )
}
