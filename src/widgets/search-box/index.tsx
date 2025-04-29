'use client'
import { Button } from '@/shared/shadcn/ui/button'
import { Icons } from '@/shared/ui/icons'
import { cn } from '@/shared/utils/cn'
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'

export default function SearchBox({ className }: { className?: string }) {
   const router = useRouter()
   const searchInputRef = useRef<HTMLInputElement | null>()
   const [isFocus, setIsFocus] = useState(false)
   const handleSearch = async () => {
      const searchTrim = searchInputRef.current?.value.trim()
      if (!searchTrim) return

      const processedSearchTerm = searchTrim.replace(/\s+/g, '+')
      await router.push(`/search/${processedSearchTerm}`)
   }

   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!searchInputRef.current?.value.trim()) return
      if (e.key === 'Enter') {
         handleSearch()
      }
   }

   return (
      <article
         className={cn(
            'flex items-center  transition-all duration-300 overflow-ellipsis  border-b border-gray-400 ',
            className,
            isFocus ? 'w-44 ' : 'w-14 border-transparent',
         )}
      >
         <input
            ref={searchInputRef}
            aria-label="검색 입력"
            spellCheck={true}
            onKeyDown={handleKeyDown}
            maxLength={25}
            placeholder="검색"
            className={cn(
               'h-full w-full text-sm font-bold  focus:outline-none focus:ring-0 focus:border-transparent placeholder:text-xs',
            )}
            onFocus={() => {
               setIsFocus(true)
            }}
            onBlur={() => {
               setIsFocus(false)
            }}
         />
         <Button
            variant="link"
            className="h-8 px-2 text-sm"
            onClick={handleSearch}
            type="button"
            aria-label="검색"
            onFocus={() => {
               setIsFocus(true)
            }}
            onBlur={() => {
               setIsFocus(false)
            }}
         >
            <Icons.search size={16} />
         </Button>
      </article>
   )
}
