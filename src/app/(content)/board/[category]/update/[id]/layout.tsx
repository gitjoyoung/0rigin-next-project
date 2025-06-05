import React from 'react'
export const metadata = {
   title: '게시판',
   description: '누구나 자유롭게 소통 가능한 게시판입니다.',
}
type Props = {
   children: React.ReactNode
}
export default function layout({ children }: Props) {
   return <>{children}</>
}
