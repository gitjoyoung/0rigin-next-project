'use client'

import { fetchTickerCounts } from '@/app/api/board/tickerApi'
import React, { useEffect, useState } from 'react'

export default function Ticker() {
   const [backAnimation, setBackAnimation] = useState('')
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
   // css 애니메이션
   useEffect(() => {
      fetchData()
      setBackAnimation('animate-pulse ')
      const timer = setTimeout(() => {
         setBackAnimation('')
      }, 2000)

      return () => clearTimeout(timer)
   }, [])

   return (
      <aside
         className={` flex gap-2 justify-end ${backAnimation} bg-black fill-in-animation items-center w-full text-white text-xs  `}
      >
         <div className="flex ">
            <p className="px-1">방문자 {count.visit}</p>
            <p className="px-1">게시글 {count.post}</p>
            <p className="px-2">회원 수 {count.user}</p>
         </div>
      </aside>
   )
}
