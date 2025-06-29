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
   baseRoute: string
   count: number
}

const POST_PER_PAGE = 20
export default async function CustomPagination({
   count,
   currentPage,
   baseRoute,
}: PaginationProps) {
   if (count === 0) return null

   const totalPages = Math.ceil((count || 0) / POST_PER_PAGE)

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
   const showFirstPage = pageNumbers[0] > 1
   const showLastPage = pageNumbers[pageNumbers.length - 1] < totalPages

   return (
      <Pagination>
         <PaginationContent>
            <PaginationItem>
               <PaginationPrevious
                  href={`${baseRoute}?page=${currentPage - 1}`}
                  className={cn(
                     currentPage <= 1 && 'pointer-events-none opacity-50',
                  )}
               />
            </PaginationItem>

            {showFirstPage && (
               <>
                  <PaginationItem>
                     <PaginationLink
                        className="text-xs"
                        href={`${baseRoute}?page=1`}
                        isActive={1 === currentPage}
                     >
                        1...
                     </PaginationLink>
                  </PaginationItem>
               </>
            )}

            {pageNumbers.map((page) => (
               <PaginationItem key={page}>
                  <PaginationLink
                     href={`${baseRoute}?page=${page}`}
                     isActive={page === currentPage}
                  >
                     {page}
                  </PaginationLink>
               </PaginationItem>
            ))}

            {showLastPage && (
               <>
                  <PaginationItem>
                     <PaginationLink
                        className="text-xs"
                        href={`${baseRoute}?page=${totalPages}`}
                        isActive={totalPages === currentPage}
                     >
                        ...{totalPages}
                     </PaginationLink>
                  </PaginationItem>
               </>
            )}

            <PaginationItem>
               <PaginationNext
                  href={`${baseRoute}?page=${currentPage + 1}`}
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
