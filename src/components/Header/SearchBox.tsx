'use client'

import { ROUTES } from '@/constants/route'
import { useRouter } from 'next/navigation'
import React, { useRef } from 'react'

export default function SearchBox() {
   const router = useRouter()
   const searchInputRef = useRef<HTMLInputElement | null>(null)

   // 검색 버튼 페이지 이동
   const handleSearch = async () => {
      const searchTrim = searchInputRef.current?.value.trim()
      if (searchTrim == null) return

      const processedSearchTerm = searchTrim.replace(/\s+/g, '+')
      await router.push(`${ROUTES.SEARCH}/${processedSearchTerm}`)

      if (searchInputRef.current) {
         searchInputRef.current.value = '' // 입력 필드 초기화
      }
   }
   // 키보드 입력
   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
         handleSearch()
      }
   }
   return (
      <section className="flex items-center justify-center text-sm   ">
         <input
            ref={searchInputRef}
            spellCheck={false}
            className="border p-0.5 "
            type="text"
            onKeyDown={handleKeyDown}
            placeholder="검색"
         />
         <button
            className="p-0.5 flex-none border border-black"
            onClick={handleSearch}
            type="submit"
         >
            검색
         </button>
      </section>
   )
}
