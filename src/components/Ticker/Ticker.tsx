'use client'

import { fetchTickerCounts } from '@/service/board/tickerApi'
import React, { useEffect, useState } from 'react'

export default function Ticker() {
   const [count, setCount] = useState({
      post: 0,
      visit: 0,
      user: 0,
   })

   const fetchData = async () => {
      const data = await fetchTickerCounts()
      if (data === null) return
      setCount(data)
   }

   useEffect(() => {
      fetchData()
   }, [])

   return (
      <aside className="flex gap-2 justify-end bg-black animate-intro items-center w-full text-white text-xs">
         <ul className="flex ">
            <li className="px-1">방문자 {count.visit}</li>
            <li className="px-1">게시글 {count.post}</li>
            <li className="px-2">회원 수 {count.user}</li>
         </ul>
      </aside>
   )
}
