import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
   title: 'Contact',
   description: 'business contact page',
}
type Props = {
   children: React.ReactNode
}
export default function layout({ children }: Props) {
   return <>{children}</>
}
