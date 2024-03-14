'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { TopPost } from '@/types/boardTypes'
// 추가 이미지 경로들...

interface Props {
   topData: TopPost[]
}

export default function Banner({ topData }: Props) {
   const [selectedPost, setSelectedPost] = useState(0)

   useEffect(() => {
      const timer =
         topData?.length > 0 &&
         setInterval(() => {
            setSelectedPost((prevIndex) => (prevIndex + 1) % topData.length)
         }, 2500)

      return () => timer && clearInterval(timer)
   }, [topData?.length])

   if (!topData?.length) {
      return null
   }
   return (
      <section className="w-full  flex flex-wrap justify-center  border border-black   ">
         {/*  게시물 프리뷰 */}
         <div className=" w-full  md:w-7/12 md:border-r border-black ">
            <div className="relative w-full  h-56 z-0  ">
               <Link href={`/board/read/${topData[selectedPost].id}`}>
                  <Image
                     alt="개구리"
                     src="/sadpepe.jpg"
                     fill
                     objectFit="cover"
                  />
                  <div className="   absolute bottom-0 w-full   bg-gradient-to-t from-black pt-5 p-4  text-white ">
                     <h1 className="text-2xl font-bold line-clamp-2 max-w-prose ">
                        {topData[selectedPost].title}
                     </h1>
                     <p className=" break-words text-sm line-clamp-2 max-w-prose  ">
                        {topData[selectedPost].content}
                     </p>
                  </div>
               </Link>
            </div>
         </div>
         {/* 베스트 게시물 리스트 */}
         <div className="  md:w-5/12 w-full p-2 ">
            <h1 className="font-bold ">베스트 게시글 TOP 5</h1>
            <div className="m-2 text-sm ">
               {topData.map(({ title, id, like, view }, index) => (
                  <Link
                     key={`post-${id}`} // Use a unique identifier from the data instead of the index
                     className={`border flex justify-between mt-1 p-1 ${
                        selectedPost === index
                           ? 'bg-gray-200 font-bold'
                           : 'text-sm'
                     }`}
                     href={`/board/read/${id}`}
                  >
                     <h2 className="line-clamp-1 flex-1 max-w-prose ">
                        {title}
                     </h2>
                     <div className="flex gap-2 text-gray-500 text-xs px-1 ">
                        <h3 className=" ">추천수 : {like || 0}</h3>
                        <h3 className="  ">조회수 : {view || 0}</h3>
                     </div>
                  </Link>
               ))}
            </div>
         </div>
      </section>
   )
}
