import { ROUTE_BOARD } from '@/constants/pathname'
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
   currentPage: number
   totalPages: number
}

export default function CustomPagination({
   currentPage,
   totalPages,
}: PaginationProps) {
   const itemsPerPage = 5 // 한 번에 보여줄 페이지 수

   const getPageNumbers = () => {
      const pages = []
      const halfItemsPerPage = Math.floor(itemsPerPage / 2)

      let startPage = Math.max(1, currentPage - halfItemsPerPage)
      let endPage = Math.min(totalPages, startPage + itemsPerPage - 1)

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
                  href={`${ROUTE_BOARD}?page=${currentPage - 1}`}
                  className={cn(
                     currentPage <= 1 && 'pointer-events-none opacity-50',
                  )}
               />
            </PaginationItem>

            {pageNumbers.map((page) => (
               <PaginationItem key={page}>
                  <PaginationLink
                     href={`${ROUTE_BOARD}?page=${page}`}
                     isActive={page === currentPage}
                  >
                     {page}
                  </PaginationLink>
               </PaginationItem>
            ))}

            <PaginationItem>
               <PaginationNext
                  href={`${ROUTE_BOARD}?page=${currentPage + 1}`}
                  className={cn(
                     currentPage >= totalPages &&
                        'pointer-events-none opacity-50',
                  )}
               />
            </PaginationItem>
         </PaginationContent>
      </Pagination>
   )
}
