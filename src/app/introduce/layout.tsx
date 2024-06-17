import { Metadata } from 'next'
import React from 'react'

export const metadata : Metadata = {
   title: '0rigin',
   description: '0rigin은 이렇게 탄생 하였습니다',
}
type Props = {
   children: React.ReactNode
}
export default function layout({ children }: Props) {
   return <>{children}</>
}
