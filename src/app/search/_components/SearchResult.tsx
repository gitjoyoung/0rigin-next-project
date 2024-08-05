import { gptFetchGpt } from '@/app/api/search/gpt/route'
import fetchSearch from '@/service/search/search'
import { useEffect, useState } from 'react'

interface Props {
   keyword: string
}

export default async function SearchResult({ keyword }: Props) {
   const gptResult = await gptFetchGpt(keyword)
   const resultJson = await gptResult.json()
   return (
      <div className=" flex-col gap-2 py-2">
         <h2 className="p-1 font-bold text-xl ">GPT-3.5 답변</h2>
         <div className=" p-2 whitespace-pre-line border-dotted rounded-lg border-black border">
            <p>{resultJson}</p>
         </div>
      </div>
   )
}
