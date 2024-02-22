import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import SearchButton from '../Header/SearchBox'

interface SearchResult {
   id: number
   title: string
   content: string
   image: string
}

export default function Search() {
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

   return (
      <div>
         <ul className="py-2 ">
            <h1>게시판 검색결과 {searchResults.length} 건</h1>
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
         <SearchButton />
      </div>
   )
}
