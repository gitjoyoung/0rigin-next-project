import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
   title: '0rigin 글쓰기',
}
export default function layout({ children }: { children: React.ReactNode}) {
   return <>{children}</>
}
