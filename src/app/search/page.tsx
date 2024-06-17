import Search from '@/components/Search/Search'
import React from 'react'
import { Metadata } from 'next'
import { IParams } from '@/types/common/IParams'

interface SearchParams {
   searchParams: {
      keyword: string
   }
}

export default function page({ searchParams }: SearchParams) {
   const { keyword } = searchParams
   return (
      <>
         <Search keyword={keyword} />
      </>
   )
}
