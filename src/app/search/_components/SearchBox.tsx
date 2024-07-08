'use client'

import { ROUTES } from '@/constants/route'
import { useRouter } from 'next/navigation'
import React, { useRef } from 'react'

export default function SearchBox() {
   const router = useRouter()
   const searchInputRef = useRef<HTMLInputElement | null>()

   const handleSearch = async () => {
      const searchTrim = searchInputRef.current?.value.trim()
      if (!searchTrim) return

      const processedSearchTerm = searchTrim.replace(/\s+/g, '+')
      await router.push(`${ROUTES.SEARCH}?keyword=${processedSearchTerm}`)
   }
   // 키보드 입력
   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (searchInputRef.current.value.trim() === '') return
      if (e.key === 'Enter') {
         handleSearch()
      }
   }
   return (
      <article className="flex items-center justify-center text-sm   ">
         <input
            ref={searchInputRef}
            spellCheck={false}
            className="border p-0.5 w-full"
            type="text"
            onKeyDown={handleKeyDown}
            placeholder="검색"
            maxLength={50}
         />
         <button
            className="p-0.5 flex-none border border-black"
            onClick={handleSearch}
            type="button"
         >
            검색
         </button>
      </article>
   )
}
