import { SupabaseBrowserClient } from '@/shared/lib/supabase/supabase-browser-client'
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
}

const POST_PER_PAGE = 20
export default async function CustomPagination({
   currentPage,
   baseRoute,
}: PaginationProps) {
   const supabase = await SupabaseBrowserClient()
   const { count } = await supabase
      .from('posts')
      .select('*', { count: 'exact', head: true })

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
