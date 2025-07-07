'use client'
import { Input } from '@/shared/shadcn/ui/input'
import { Label } from '@/shared/shadcn/ui/label'
import { cn } from '@/shared/utils/cn'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'

export default function SearchBox({ className }: { className?: string }) {
   const searchInputRef = useRef<HTMLInputElement | null>(null)
   const [isFocus, setIsFocus] = useState(false)
   const router = useRouter()

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
            'flex items-center transition-all duration-300 overflow-ellipsis relative',
            className,
            isFocus ? 'w-44 ' : 'w-24 border-transparent',
         )}
      >
         <Input
            id="search"
            ref={searchInputRef}
            aria-label="검색 입력"
            spellCheck={true}
            onKeyDown={handleKeyDown}
            maxLength={25}
            placeholder="검색"
            className={cn(
               'h-full w-full text-sm font-bold ring-0 border-0 focus:outline-none focus:ring-0 focus:border-none border-none placeholder:text-xs shadow-none ',
            )}
            onFocus={() => {
               setIsFocus(true)
            }}
            onBlur={() => {
               setIsFocus(false)
            }}
         />
         <Label
            htmlFor="search"
            onClick={handleSearch}
            aria-label="검색"
            onFocus={() => {
               setIsFocus(true)
            }}
            onBlur={() => {
               setIsFocus(false)
            }}
            className="absolute right-1 bg-background px-1 py-0.5 rounded"
         >
            <Search size={16} />
         </Label>
      </article>
   )
}
