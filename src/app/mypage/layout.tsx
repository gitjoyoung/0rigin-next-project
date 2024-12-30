import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
   title: '마이페이지',
   description: 'business contact page',
}
type Props = {
   children: React.ReactNode
}
export default function layout({ children }: Props) {
   return <>{children}</>
}
