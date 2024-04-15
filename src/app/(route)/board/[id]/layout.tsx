'use client'

import BoardContent from '@/components/Board/BoardContent'
import BoardFooter from '@/components/Board/BoardFooter'
import BoardHeader from '@/components/Board/BoardHeader'
import Pagination from '@/components/Board/Pagination'

export default async function layout({
   children,
}: {
   children: React.ReactNode
}) {
   return (
      <>
         <BoardHeader title="왁자지껄 게시판" />
         {children}
         <BoardContent />
         <Pagination />
         <BoardFooter />
      </>
   )
}
