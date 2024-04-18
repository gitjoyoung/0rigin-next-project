import Search from '@/components/Search/Search'
import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
   title: '0rigin 검색',
}

export default function page() {
   return <Search />
}
