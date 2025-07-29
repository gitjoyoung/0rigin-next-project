'use client'

import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import { usePhilosopherMatcher } from './hooks/use-philosopher-matcher'
import PhilosopherCarousel from './ui/philosopher-carousel'
import SearchInput from './ui/search-input'

export default function PhilosopherMatcher() {
   const router = useRouter()
   const inputRef = useRef<HTMLInputElement>(null)
   const { searchState, searchPhilosophers } = usePhilosopherMatcher()

   return (
      <section className="w-full py-6 px-4">
         {/* 검색 섹션 - 제한된 너비 */}
         <div className="max-w-4xl mx-auto mb-6">
            {/* 헤더 */}
            <div className="text-center mb-6">
               <h2 className="text-xl font-bold mb-2">
                  어떤 고민이 있으신가요?
               </h2>
               <p className="text-sm text-muted-foreground">
                  고민을 입력하면 관련 철학가와 위인들의 답변을 찾아드립니다
               </p>
            </div>

            {/* 검색 */}
            <SearchInput
               ref={inputRef}
               onSearch={searchPhilosophers}
               isSearching={searchState.isSearching}
               placeholder="고민을 입력해보세요..."
            />
         </div>

         {/* 결과 섹션 - 전체 너비 */}
         {searchState.results && searchState.results.length > 0 && (
            <div className="w-full">
               <PhilosopherCarousel results={searchState.results} />
            </div>
         )}

         {/* 검색 중 */}
         {searchState.isSearching && (
            <div className="text-center py-8">
               <p className="text-sm text-muted-foreground">
                  철학가와 위인들을 찾고 있습니다...
               </p>
            </div>
         )}

         {/* 검색했지만 결과가 없는 경우 */}
         {searchState.query &&
            !searchState.isSearching &&
            searchState.results.length === 0 && (
               <div className="max-w-4xl mx-auto text-center py-8">
                  <p className="text-sm text-muted-foreground">
                     관련 철학가나 위인을 찾지 못했습니다. 다른 키워드로
                     검색해보세요.
                  </p>
               </div>
            )}
      </section>
   )
}
