'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { openai } from '@/lib/openAI'
import SearchButton from '../Header/SearchBox'

interface SearchResult {
   id: number
   title: string
   content: string
   image: string
}
interface Props {
   placeholder?: string
   decodeSlug?: string
}

export default function Search({ placeholder, decodeSlug }: Props) {
   console.log('decodeSlug', decodeSlug)

   const searchResults = [
      {
         id: 1,
         title: 'Custom Title 1ddddddddddd dddddddddddddddddddd',
         content:
            'Custom Content 1 with 30 charactersdddddddddddㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ ddddddddddddddddddddddddd',
         image: '/mascot/winksaurus.png',
      },
      {
         id: 2,
         title: 'Custom Title 2',
         content:
            'Custom Content 2 with 30 charactersㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ',
         image: '/mascot/winksaurus.png',
      },
      {
         id: 3,
         title: 'Custom Title 3',
         content: 'Custom Content 3 with 30 characterㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇs',
         image: '/mascot/winksaurus.png',
      },
   ]
   const [GptResult, setGptResult] = useState([])
   const chatGpt = async () => {
      const stream = await openai.chat.completions.create({
         model: 'gpt-3.5-turbo',
         messages: [
            {
               role: 'user',
               content: decodeSlug,
            },
         ],
         stream: true,
      })
      const data = []

      for await (const chunk of stream) {
         const newData = chunk.choices[0]?.delta?.content || ''
         setGptResult((prev) => [...prev, newData])
      }
   }

   return (
      <div>
         <ul className="py-2  ">
            <button
               className="border p-1 border-black"
               type="button"
               onClick={chatGpt}
            >
               GPT-4 검색결과 버튼
            </button>
            <p>{GptResult}</p>

            <div className="flex  overflow-hidden whitespace-nowrap  items-end">
               <h1 className=" line-clamp-1  min-w-0 ">
                  검색어 : {decodeSlug}
               </h1>
               <h1 className="ml-2 font-bold text-2xl ">
                  게시판 검색결과 {searchResults.length} 건
               </h1>
            </div>

            {searchResults.map((result: SearchResult) => (
               <li className=" border p-2 flex" key={result.id}>
                  <div
                     className="border border-black min-w-[100px] min-h-[100px]
                 items-center flex relative"
                  >
                     <Image
                        src={result.image}
                        fill
                        alt={result.title}
                        className="object-cover"
                     />
                  </div>
                  <div className=" p-1 ">
                     <Link
                        className="line-clamp-1  text-base font-semibold "
                        href="/"
                     >
                        {result.title}
                     </Link>
                     <Link className="line-clamp-3 text-sm" href="/">
                        {result.content}
                     </Link>
                  </div>
               </li>
            ))}
         </ul>
         <div className="m-3 justify-end flex">
            <SearchButton placeholder={placeholder} />
         </div>
      </div>
   )
}
