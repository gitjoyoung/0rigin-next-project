'use client'

import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function SearchBox() {
   const router = useRouter()
   const pathname = usePathname()
   const [search, setSearch] = useState('')

   /**
    * 검색 페이지 이동
    */
   const handleSearch = async () => {
      // 검색어가 없을 경우 검색하지 않음
      const searchTrim = search.trim()
      if (!searchTrim) {
         return
      }
      // 검색어에 공백이 있을 경우 공백을 +로 치환 (네이버 구글 쿼리 참조)
      const processedSearchTerm = searchTrim.replace(/\s+/g, '+')

      router.push(`/search/${processedSearchTerm}`)
   }

   /**
    * 엔터키 입력시 검색
    * @param e
    */
   const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
         handleSearch()
      }
   }
   return (
      <section className="flex items-center justify-center text-sm relative  ">
         <input
            spellCheck={false}
            className="border p-0.5 flex-grow w-auto"
            type="text"
            onChange={(e) => setSearch(e.target.value as string)}
            onKeyDown={handleKeyDown}
            placeholder="검색"
         />
         <button
            className="p-0.5 absolute right-0 "
            onClick={handleSearch}
            type="submit"
         >
            검색
         </button>
      </section>
   )
}
