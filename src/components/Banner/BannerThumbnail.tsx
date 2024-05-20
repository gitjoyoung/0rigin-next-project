import { TopPost } from '@/types/boardTypes'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Props {
   data: TopPost
}

export default function BannerThumbnail({ data }: Props) {
   const { id, title, summary, thumbnail, nickname } = data

   return (
      <div className=" w-full  md:w-7/12 md:border-r border-black ">
         <div className="relative w-full  h-56 z-0  ">
            <Link href={`/board/${id}`}>
               <Image
                  alt="윙크 사우로스"
                  src={thumbnail || '/mascot/winksaurus.png'}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
               />
               <div className="   absolute bottom-0 w-full   bg-gradient-to-t from-black pt-5 p-4  text-white ">
                  <h1 className="text-2xl font-bold line-clamp-1 max-w-prose ">
                     {title || '제목이 없습니다'}
                  </h1>
                  <p className=" break-words text-sm line-clamp-2 max-w-prose  ">
                     {summary || '요약이 없습니다'}
                  </p>
               </div>
               <div className="absolute top-0 bg-black text-white text-sm right-0 p-1">
                  <p>{nickname || '닉네임'}</p>
               </div>
            </Link>
         </div>
      </div>
   )
}
