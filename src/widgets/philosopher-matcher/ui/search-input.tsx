'use client'

import { Button } from '@/shared/shadcn/ui/button'
import { Input } from '@/shared/shadcn/ui/input'
import { cn } from '@/shared/utils/cn'
import { Loader2, Search } from 'lucide-react'
import { forwardRef, useRef, useState } from 'react'
import { RECOMMENDED_KEYWORDS } from '../constants/recommended-keywords'

interface SearchInputProps {
   onSearch: (query: string) => void
   isSearching?: boolean
   placeholder?: string
   className?: string
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
   (
      {
         onSearch,
         isSearching = false,
         placeholder = '당신의 고민을 입력해보세요...',
         className,
      },
      ref,
   ) => {
      const [query, setQuery] = useState('')
      const inputRef = useRef<HTMLInputElement>(null)

      const handleSearch = () => {
         if (query.trim()) {
            onSearch(query.trim())
         }
      }

      const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
         if (e.key === 'Enter' && query.trim()) {
            handleSearch()
         }
      }

      const handleKeywordClick = (keyword: string) => {
         setQuery(keyword)
         onSearch(keyword)
      }

      return (
         <div className={cn('w-full max-w-2xl mx-auto', className)}>
            <div className="flex items-center gap-2">
               <div className="relative flex-1">
                  <Input
                     ref={ref}
                     value={query}
                     onChange={(e) => setQuery(e.target.value)}
                     onKeyDown={handleKeyDown}
                     placeholder={placeholder}
                     className="pr-12 h-12 text-base"
                     disabled={isSearching}
                  />
                  <Button
                     onClick={handleSearch}
                     disabled={!query.trim() || isSearching}
                     size="sm"
                     className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 p-0"
                  >
                     {isSearching ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                     ) : (
                        <Search className="h-4 w-4" />
                     )}
                  </Button>
               </div>
            </div>

            {/* 추천 검색어 */}
            <div className="text-xs text-muted-foreground my-2 text-center  overflow-x-scroll scrollbar-hide whitespace-nowrap pb-2">
               {RECOMMENDED_KEYWORDS.map((keyword, index) => (
                  <span key={keyword}>
                     <button
                        onClick={() => handleKeywordClick(keyword)}
                        className="text-primary hover:underline mx-1"
                     >
                        {keyword}
                     </button>
                  </span>
               ))}
               등
            </div>
         </div>
      )
   },
)

SearchInput.displayName = 'SearchInput'

export default SearchInput
