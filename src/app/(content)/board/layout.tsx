import { Metadata } from 'next'
import BoardFooter from './ui/BoardFooter'
import BoardHeader from './ui/BoardHeader'
export const metadata: Metadata = {
   title: '게시판 홈',
   description: '누구나 자유롭게 소통 가능한 게시판입니다.',
}
export default async function layout({
   children,
}: {
   children: React.ReactNode
}) {
   return (
      <>
         <BoardHeader />
         {children}
         <BoardFooter />
      </>
   )
}
