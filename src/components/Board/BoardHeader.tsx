import Link from 'next/link'
import React from 'react'

type Props = {
   title: string
}
export default function BoardHeader({ title }: Props) {
   return (
      <div className="my-3 flex justify-between relative px-1">
         <div>
            <Link href="/board" className="text-3xl font-bold">
               {title} 게시판
            </Link>
            <p>{title} 게시판입니다</p>
         </div>
         <div className="absolute right-0 bottom-0 border border-black  shadow-md  flex items-center">
            <Link href="/board/create" className="px-4 py-2 font-bold">
               글쓰기
            </Link>
         </div>
      </div>
   )
}
