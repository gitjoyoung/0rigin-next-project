import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
   title: '퀴즈',
   description: '매일매일 더 똑똑해지는 0rigin 퀴즈!',
}
type Props = {
   children: React.ReactNode
}
export default function layout({ children }: Props) {
   return <>{children}</>
}
