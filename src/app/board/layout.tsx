import { Metadata } from 'next'
import BoardHeader from './_components/BoardHeader'
import BoardFooter from './_components/BoardFooter'
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
         <BoardHeader title={'게시판'} />
         {children}
         <BoardFooter />
      </>
   )
}
