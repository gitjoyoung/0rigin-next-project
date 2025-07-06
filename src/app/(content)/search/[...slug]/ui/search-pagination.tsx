import {
   Pagination,
   PaginationContent,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
} from '@/shared/shadcn/ui/pagination'
import { cn } from '@/shared/utils/cn'

interface PaginationProps {
   activePage: number
   paginationBaseUrl: string
   totalItemCount: number
}

const POST_PER_PAGE = 20
export default async function SearchPagination({
   totalItemCount,
   activePage,
   paginationBaseUrl,
}: PaginationProps) {
   const totalPages = Math.ceil((totalItemCount || 0) / POST_PER_PAGE)

   const itemsPerPage = 5 // 한 번에 보여줄 페이지 수

   const getPageNumbers = () => {
      const pages = []

      console.log('totalPages', totalItemCount, totalPages)
      // totalPages가 0인 경우 1페이지만 표시
      if (totalPages <= 0) {
         return [1]
      }

      const halfItemsPerPage = Math.floor(itemsPerPage / 2)

      let startPage = Math.max(1, activePage - halfItemsPerPage)
      const endPage = Math.min(totalPages, startPage + itemsPerPage - 1)

      if (endPage - startPage + 1 < itemsPerPage) {
         startPage = Math.max(1, endPage - itemsPerPage + 1)
      }

      for (let i = startPage; i <= endPage; i++) {
         pages.push(i)
      }

      return pages
   }

   const pageNumbers = getPageNumbers()

   return (
      <Pagination>
         <PaginationContent>
            <PaginationItem>
               <PaginationPrevious
                  href={`${paginationBaseUrl}/${activePage - 1}`}
                  className={cn(
                     activePage <= 1 && 'pointer-events-none opacity-50',
                  )}
               />
            </PaginationItem>

            {pageNumbers.map((page) => (
               <PaginationItem key={page}>
                  <PaginationLink
                     href={`${paginationBaseUrl}/${page}`}
                     isActive={page === activePage}
                  >
                     {page}
                  </PaginationLink>
               </PaginationItem>
            ))}

            <PaginationItem>
               <PaginationNext
                  href={`${paginationBaseUrl}/${activePage + 1}`}
                  className={cn(
                     activePage >= totalPages &&
                        'pointer-events-none opacity-50',
                  )}
               />
            </PaginationItem>
         </PaginationContent>
      </Pagination>
   )
}
