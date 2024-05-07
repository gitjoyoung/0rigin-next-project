import Search from '@/components/Search/Search'
import React from 'react'
import { Metadata } from 'next'
import SearchSuspense from '@/components/Search/SearchSuspense'

export const metadata: Metadata = {
   title: '0rigin 검색',
}

export default function page() {
   return (
      <SearchSuspense>
         <Search />
      </SearchSuspense>
   )
}
