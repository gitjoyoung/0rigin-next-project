'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ROUTES } from '@/constants/route'
import { SearchResult } from '@/types/searchTypes'
import fetchSearch from '@/app/api/search/search'
import { chatGpt } from '@/app/api/gpt/chatGpt'
import SearchBox from '../Header/SearchBox'

interface Props {
   decodeSlug?: string
}

export default function Search({ decodeSlug }: Props) {
   const [Result, setResult] = useState<SearchResult[]>([])
   const [GptResult, setGptResult] = useState('')

   useEffect(() => {
      chatGpt(decodeSlug).then((data) => {
         setGptResult(data)
      })
      fetchSearch(decodeSlug).then((data) => {
         setResult(data)
      })
   }, [decodeSlug])

   return (
      <div>
         <ul className="py-2 px-2 flex-col gap-3">
            <div className="flex justify-center">
               <h1 className=" line-clamp-1  min-w-0 text-2xl ">
                  검색어 : {decodeSlug}
               </h1>
            </div>
            <div className=" flex-col gap-2 py-2">
               <h2 className="p-1 font-bold text-xl ">GPT-3.5 검색결과</h2>
               <div className=" p-2 whitespace-pre-line border-dotted rounded-lg border-black border">
                  <p>{GptResult}</p>
               </div>
            </div>
            <div className="flex flex-col py-2  overflow-hidden whitespace-nowrap  ">
               <h2 className="p-1 font-bold text-xl ">
                  게시판 검색결과 {Result.length} 건
               </h2>
            </div>

            {Result.map((result: SearchResult) => (
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
            ))}
         </ul>
         <div className="m-3 justify-end flex">
            <SearchBox />
         </div>
      </div>
   )
}
