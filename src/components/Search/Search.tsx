'use client'

import { useSearchParams } from 'next/navigation'
import SearchBox from './SearchBox'
import SearchResult from './SearchResult'
import SearchBoard from './SearchBoard'

export default function Search({ keyword }) {
   // const searchParams = useSearchParams()
   // const keyword = searchParams.get('keyword')

   return (
      <>
         <ul className="py-2 px-2 flex-col gap-3">
            <SearchResult keyword={keyword} />
            <SearchBoard keyword={keyword} />
         </ul>
         <div className="m-3 justify-end flex">
            <SearchBox />
         </div>
      </>
   )
}
