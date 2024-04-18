import { ROUTES } from '@/constants/route'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function SearchBoard({ Result }) {
   return (
      <article>
         {' '}
         <div className="flex flex-col py-2  overflow-hidden whitespace-nowrap  ">
            <h2 className="p-1 font-bold text-xl ">
               게시판 검색결과 {Result.length} 건
            </h2>
         </div>
         {Result.length > 0 ? (
            Result.map((result) => (
               <li className=" border p-2 flex gap-3" key={result.id}>
                  <div
                     className="border border-black min-w-[100px] min-h-[100px]
      items-center flex relative"
                  >
                     <Image
                        src={result?.thumbnail || '/mascot/winksaurus3.png'}
                        fill
                        alt={result.title}
                        className="object-cover"
                     />
                  </div>
                  <div className=" p-1 flex flex-col gap-2">
                     <Link href={`${ROUTES.BOARD}/1/${result.id}`}>
                        <h1 className="line-clamp-1  text-base font-semibold whitespace-pre overflow-hidden ">
                           {result.title}
                        </h1>
                        <p className="line-clamp-3 text-sm">
                           {result.summary || ''}
                        </p>
                     </Link>
                  </div>
               </li>
            ))
         ) : (
            <h1 className="p-1">게시글이 없네요...</h1>
         )}
      </article>
   )
}
