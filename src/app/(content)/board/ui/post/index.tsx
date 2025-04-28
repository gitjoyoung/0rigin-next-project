'use client'

import { ROUTE_BOARD } from '@/constants/pathname'
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/shared/shadcn/ui/table'
import formatDate from '@/shared/utils/validators/board/format-date'
import { formatValue } from '@/shared/utils/validators/statsValidators/formatNumber'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import type { IPost } from '../../types/post-type'

interface Props {
   postData: IPost[]
}

export default function Post({ postData }: Props) {
   const page = useSearchParams().get('page') || 1

   if (!postData) return <p className="text-xl">무, 공, 허무 그리고 아포리아</p>
   return (
      <Table className="w-full font-dos  ">
         <TableHeader>
            <TableRow className="text-xs sm:text-sm">
               <TableHead className="text-center w-[5%] min-w-[40px]">
                  번호
               </TableHead>
               <TableHead className="w-auto min-w-[150px]">제목</TableHead>
               <TableHead className="text-center w-[5%] min-w-[60px]">
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
            {postData.map((item: IPost) => {
               return (
                  <TableRow
                     key={item.id}
                     className="hover:bg-gray-200 dark:hover:bg-gray-800 text-xs sm:text-sm"
                  >
                     <TableCell className="w-[5%] min-w-[40px] text-center">
                        {item.id}
                     </TableCell>
                     <TableCell className="w-auto min-w-[100px] overflow-ellipsis">
                        <Link
                           href={`${ROUTE_BOARD}/${item.id}?page=${page}`}
                           className="flex items-center gap-1 group-hover:text-primary dark:group-hover:text-primary"
                        >
                           <h2 className="truncate font-medium">
                              {item.title}
                           </h2>
                           {item.comments > 0 && (
                              <span className="text-muted-foreground">
                                 [{item.comments}]
                              </span>
                           )}
                        </Link>
                     </TableCell>

                     <TableCell className="w-[5%] min-w-[60px] text-center text-xs">
                        {item.author?.name || '닉네임'}
                     </TableCell>
                     <TableCell className="w-[5%] min-w-[100px] text-center text-xs hidden sm:table-cell">
                        {formatDate(item.created_at)}
                     </TableCell>
                     <TableCell className="w-[4%] min-w-[50px] text-center text-xs hidden sm:table-cell">
                        {formatValue(item.views)}
                     </TableCell>
                     <TableCell className="w-[4%] min-w-[50px] text-center text-xs hidden sm:table-cell">
                        {formatValue(item.likes)}
                     </TableCell>
                  </TableRow>
               )
            })}
         </TableBody>
      </Table>
   )
}
