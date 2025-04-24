import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
   title: '검색 패이지',
   description: '0rigin 검색 패이지',
}
type Props = {
   children: React.ReactNode
}
export default function layout({ children }: Props) {
   return <>{children}</>
}
