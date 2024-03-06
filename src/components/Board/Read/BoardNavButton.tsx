import Link from 'next/link'
import React from 'react'

export default function BoardNavButton({ postID, router }) {
   return (
      <div className="flex justify-between p-1 items-center">
         <Link href={`/board/read/${parseInt(postID, 10) - 1} `}>
            <p> 이전 글</p>
         </Link>
         <button
            type="button"
            className="px-2 py-2"
            onClick={() => router.push('/board')}
         >
            목록
         </button>
         <Link href={`/board/read/${parseInt(postID, 10) + 1}`}>
            <p>다음 글</p>
         </Link>
      </div>
   )
}
