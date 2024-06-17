import { ROUTES } from '@/constants/route'
import fetchSearch from '@/service/search/search'
import Image from 'next/image'
import Link from 'next/link'
import React, { use, useEffect, useState } from 'react'

type Props = {
   keyword: string
}

export default function SearchBoard({ keyword }: Props) {
   const [result, setResult] = useState([])
   useEffect(() => {
      const fetchData = async () => {
         const res = await fetchSearch(keyword)
         setResult(res)
      }
      fetchData()
   }, [keyword])

   return (
      <article>
         {' '}
         <div className="flex flex-col py-2  overflow-hidden whitespace-nowrap  ">
            <h2 className="p-1 font-bold text-xl ">
               게시판 검색결과 {result.length} 건
            </h2>
         </div>
         {result.length > 0 ? (
            result.map((data) => (
               <li className=" border p-2 flex gap-3" key={data.id}>
                  <div
                     className="border border-black min-w-[100px] min-h-[100px]
      items-center flex relative"
                  >
                     <Image
                        src={data?.thumbnail || '/mascot/winksaurus3.png'}
                        fill
                        alt={data.title}
                        className="object-cover"
                     />
                  </div>
                  <div className=" p-1 flex flex-col gap-2">
                     <Link href={`${ROUTES.BOARD}/1/${data.id}`}>
                        <h1 className="line-clamp-1  text-base font-semibold whitespace-pre overflow-hidden ">
                           {data.title}
                        </h1>
                        <p className="line-clamp-3 text-sm">
                           {data.summary || ''}
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
