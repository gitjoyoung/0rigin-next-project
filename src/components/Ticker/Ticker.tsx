'use client'

import { fetchInfo } from '@/app/api/board/infoApi'
import React, { useEffect, useState } from 'react'

export default function Ticker() {
   const [backAnimation, setBackAnimation] = useState('')
   const [count, setCount] = useState({
      visitorCount: { count: 0 },
      postCount: { count: 0 },
      memberCount: { count: 0 },
   })

   const fetchData = async () => {
      try {
         const data = await fetchInfo()
         console.log('data', data)
         // setCount(data) 이전 데이터를 유지하면서 새로운 데이터를 추가
         setCount((prev) => ({ ...prev, ...data }))
         console.log('count', count)
      } catch (error) {
         console.error('Failed to fetch data:', error)
      }
   }
   // css
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
            <p className="px-1">방문자 {count.visitorCount?.count}</p>
            <p className="px-1">게시글 {count.postCount.count}</p>
            <p className="px-2">회원 수 {count.memberCount.count}</p>
         </div>
      </aside>
   )
}
