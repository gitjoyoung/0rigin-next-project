import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
   title: '검색 페이지',
   description: '0RIGIN(제로리진) 검색 페이지',
}
type Props = {
   children: React.ReactNode
}
export default function layout({ children }: Props) {
   return <>{children}</>
}
