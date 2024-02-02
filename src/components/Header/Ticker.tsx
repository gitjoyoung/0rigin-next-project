'use client'

import React, { useEffect, useState } from 'react'

interface Props {
   point?: number
   visitor?: number
   post?: number
   member?: number
}

export default function Ticker({
   point = 100000,
   visitor = 1111110,
   post = 11110,
   member = 1171,
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

   const formatValue = (value: number): string => {
      const suffixes = ['', 'K', 'M', 'B']
      let index = 0
      let updatedValue = value

      while (updatedValue >= 1000 && index < suffixes.length - 1) {
         updatedValue /= 1000
         index += 1
      }

      const formattedValue = updatedValue.toFixed(1)
      return formattedValue.endsWith('.0')
         ? `${formattedValue.slice(0, -2)}${suffixes[index]}`
         : `${formattedValue}${suffixes[index]}`
   }

   return (
      <aside
         className={` flex gap-2 justify-between ${backAnimation} bg-black fill-in-animation items-center w-full text-white text-xs  `}
      >
         <div className="flex ">
            <p className="border-r px-1">익일 포인트 :{formatValue(point)}</p>
         </div>
         <div className="flex ">
            <p className="border-r border-l px-1 ">
               방문자 {formatValue(visitor)}
            </p>
            <p className="border-r  px-1">게시글 {formatValue(post)}</p>
            <p className="px-2">회원 수 {formatValue(member)}</p>
         </div>
      </aside>
   )
}
