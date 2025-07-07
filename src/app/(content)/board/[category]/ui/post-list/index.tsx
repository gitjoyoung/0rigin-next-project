'use client'

import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/shared/shadcn/ui/table'
import type { Database } from '@/shared/types'
import ClientDayHydration from '@/shared/ui/client-day-hydration'
import { formatValue } from '@/shared/utils/validators/statsValidators/formatNumber'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

type PostData = Database['public']['Tables']['posts']['Row']

interface Props {
   data: PostData[]
   category?: string
}

export default function Post({ data, category }: Props) {
   const page = useSearchParams().get('page') || 1

   const isEmpty = !data || !Array.isArray(data) || data.length === 0

   return (
      <Table className="w-full px-0">
         <TableHeader className="border-y">
            <TableRow className="text-xs [&_th]:!h-[24px] [&_th]:max-sm:!h-[24px]">
               <TableHead className="text-center w-[5%] min-w-[40px]">
                  번호
               </TableHead>
               <TableHead className="w-auto min-w-[150px]">제목</TableHead>
               <TableHead className="text-center w-[10%] min-w-[60px] hidden sm:table-cell">
                  작성자
               </TableHead>
               <TableHead className="text-center w-[5%] min-w-[100px] hidden sm:table-cell">
                  작성일
               </TableHead>
               <TableHead className="text-center w-[4%] min-w-[40px] hidden sm:table-cell">
                  조회
               </TableHead>
               <TableHead className="text-center w-[4%] min-w-[40px] hidden sm:table-cell">
                  추천
               </TableHead>
            </TableRow>
         </TableHeader>
         <TableBody>
            {isEmpty ? (
               <TableRow>
                  <TableCell colSpan={6} className="h-60">
                     <div className="flex flex-col items-center justify-center space-y-4 text-center py-12">
                        <div className="space-y-2">
                           <h3 className="text-xl font-medium text-gray-600 dark:text-gray-400">
                              아직 작성된 글이 없습니다
                           </h3>
                           <p className="text-gray-500 dark:text-gray-500">
                              첫 번째 글을 작성해보세요
                           </p>
                        </div>

                        <Link
                           href={`/board/${category}/create`}
                           className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm"
                        >
                           글 작성하기
                        </Link>
                     </div>
                  </TableCell>
               </TableRow>
            ) : (
               data.map((item: PostData) => {
                  return (
                     <TableRow
                        key={item.id}
                        className="hover:bg-gray-200 dark:hover:bg-gray-800 text-xs h-[32px] max-sm:h-[24px]"
                     >
                        <TableCell className="w-[5%] min-w-[40px] text-center ">
                           {item.id || '-'}
                        </TableCell>
                        <TableCell className="w-auto min-w-[100px] overflow-hidden whitespace-nowrap">
                           <Link
                              href={`/board/${item.category || 'latest'}/${item.id || 0}?page=${page}`}
                              className="flex items-center gap-1 group-hover:text-primary dark:group-hover:text-primary w-full overflow-hidden text-sm font-medium"
                           >
                              <h2 className="truncate  w-full">
                                 {item.title || '제목 없음'}
                              </h2>
                           </Link>
                        </TableCell>

                        <TableCell className="min-w-[24px] max-w-[120px] text-left text-xs hidden sm:table-cell truncate">
                           {item.nickname || '익명'}
                        </TableCell>
                        <TableCell className="w-[5%] min-w-[100px] text-center text-xs hidden sm:table-cell">
                           <ClientDayHydration date={item.created_at} />
                        </TableCell>
                        <TableCell className="w-[4%] min-w-[50px] text-center text-xs hidden sm:table-cell">
                           {formatValue(item.view_count)}
                        </TableCell>
                        <TableCell className="w-[4%] min-w-[50px] text-center text-xs hidden sm:table-cell">
                           {formatValue(0)}
                        </TableCell>
                     </TableRow>
                  )
               })
            )}
         </TableBody>
      </Table>
   )
}
