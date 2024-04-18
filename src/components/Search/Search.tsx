'use client'

import React, { useEffect, useState } from 'react'
import { SearchResultType } from '@/types/searchTypes'
import fetchSearch from '@/app/api/search/search'
import { chatGpt } from '@/app/api/gpt/chatGpt'
import { useSearchParams } from 'next/navigation'
import SearchBox from './SearchBox'
import SearchResult from './SearchResult'
import SearchBoard from './SearchBoard'

export default function Search() {
   const [Result, setResult] = useState<SearchResultType[]>([])
   const [GptResult, setGptResult] = useState('')
   const searchParams = useSearchParams()
   const keyword = searchParams.get('keyword')

   useEffect(() => {
      setGptResult('')
      setResult([])
      if (keyword) {
         Promise.all([chatGpt(keyword), fetchSearch(keyword)]).then(
            ([gptData, searchData]) => {
               setGptResult(gptData)
               setResult(searchData)
            },
         )
      }
   }, [keyword])

   return (
      <>
         <ul className="py-2 px-2 flex-col gap-3">
            <SearchResult result={GptResult} title="GPT-3.5 답변" />
            <SearchBoard Result={Result} />
         </ul>
         <div className="m-3 justify-end flex">
            <SearchBox />
         </div>
      </>
   )
}
