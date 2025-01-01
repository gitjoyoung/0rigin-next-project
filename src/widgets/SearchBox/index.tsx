'use client'
import { ROUTES } from '@/constants/route'
import { Button } from '@/shared/shadcn/ui/button'
import { Input } from '@/shared/shadcn/ui/input'
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

   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!searchInputRef.current?.value.trim()) return
      if (e.key === 'Enter') {
         handleSearch()
      }
   }

   return (
      <article className="flex items-center gap-1 h-8">
         <Input
            ref={searchInputRef}
            spellCheck={false}
            type="text"
            onKeyDown={handleKeyDown}
            placeholder="검색"
            maxLength={50}
            // ▼ 높이, 글자 크기, 내부 여백 등 통일
            className="h-8 px-2 text-sm"
         />
         <Button
            variant="outline"
            className="h-8 px-2 text-sm"
            onClick={handleSearch}
            type="button"
         >
            검색
         </Button>
      </article>
   )
}
