import Link from 'next/link'
import React from 'react'

export default function BannerList({ topData, selectedPost }) {
   return (
      <div className="  w-full p-2">
         <h1 className="font-bold ">베스트 게시글 TOP 5</h1>
         <div>
            {topData.map(({ title, id, like }, index) => (
               <Link
                  key={`post-${id}`} 
                  className={`border flex justify-between mt-1 p-1 text-sm ${
                     selectedPost === index
                        ? 'bg-gray-200 font-bold'
                        : ''
                  }`}
                  href={`/board/${id}`}
               >
                  <h2 className="line-clamp-1 flex-1 max-w-prose ">{title}</h2>
                  <ul className="flex gap-2 text-gray-500 text-xs px-1 text-start">
                     <li className="w-[50px]">추천 {like || 0}</li>
                  </ul>
               </Link>
            ))}
         </div>
      </div>
   )
}
