import { ROUTES } from '@/constants/route'
import Link from 'next/link'
import React from 'react'

interface Props {
   postID: string
   page: number
}

export default function BoardNavButton({ postID, page }: Props) {
   const prevPostID = parseInt(postID, 10) - 1
   const nextPostID = parseInt(postID, 10) + 1

   return (
      <div className="flex justify-between p-1 items-center my-3">
         <Link
            className="px-2 py-2 border"
            href={`${ROUTES.BOARD}/${page}/${prevPostID} `}
         >
            <p> 이전 글</p>
         </Link>
         <Link className="px-2 py-2 border" href={`${ROUTES.BOARD}`}>
            목록
         </Link>
         <Link
            className="px-2 py-2 border"
            href={`${ROUTES.BOARD}/${page}/${nextPostID}`}
         >
            <p>다음 글</p>
         </Link>
      </div>
   )
}
