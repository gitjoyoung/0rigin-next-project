import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
   title: '검색',
   description: '인공지능을 활용 똑똑한 검색 서비스',
}
type Props = {
   children: React.ReactNode
}
export default function layout({ children }: Props) {
   return <>{children}</>
}
