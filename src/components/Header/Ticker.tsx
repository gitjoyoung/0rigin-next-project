'use client'

import React, { useEffect, useState } from 'react'

interface Props {
   point?: number
   visitor?: number
   post?: number
   member?: number
}

export default function Ticker({
   point = 0,
   visitor = 0,
   post = 0,
   member = 0,
}: Props) {
   const [backAnimation, setBackAnimation] = useState('')

   /** 애니메이션 모션 효과 */
   useEffect(() => {
      setBackAnimation('animate-pulse ')
      const timer = setTimeout(() => {
         setBackAnimation('')
      }, 2000)

      return () => clearTimeout(timer)
   }, [point, visitor, post, member])

   return (
      <aside
         className={`px-2 flex gap-2 justify-between ${backAnimation} bg-black fill-in-animation items-center w-full text-white text-xs`}
      >
         <div className="flex ">
            <p className="border-r px-2">익일 포인트 현황 {point}</p>
            <p className="border-r px-2">수령 된 포인트 현황 {point}</p>
         </div>
         <div className="flex ">
            <p className="border-r px-2">오늘 방문자 {visitor}</p>
            <p className="border-r  px-2">게시글 {post}</p>
            <p className="px-2">회원 수 {member}</p>
         </div>
      </aside>
   )
}
