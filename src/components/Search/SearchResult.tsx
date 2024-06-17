import { chatGpt } from '@/service/gpt/chatGpt'
import fetchSearch from '@/service/search/search'
import { useEffect, useState } from 'react'

interface Props {
   keyword: string
}

export default function SearchResult({ keyword }: Props) {
   const [GptResult, setGptResult] = useState('')
   const [Result, setResult] = useState<string[]>([])

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
      <div className=" flex-col gap-2 py-2">
         <h2 className="p-1 font-bold text-xl ">GPT-3.5 답변</h2>
         <div className=" p-2 whitespace-pre-line border-dotted rounded-lg border-black border">
            <p>{GptResult}</p>
         </div>
      </div>
   )
}
