import BoardContent from '@/components/Board/BoardContent'
import BoardFooter from '@/components/Board/BoardFooter'
import BoardHeader from '@/components/Board/BoardHeader'
import Pagination from '@/components/Board/Pagination'

export default function Page() {
   return (
      <>
         <BoardHeader title="왁자지껄 게시판" />
         <BoardContent />
         <Pagination />
         <BoardFooter />
      </>
   )
}
