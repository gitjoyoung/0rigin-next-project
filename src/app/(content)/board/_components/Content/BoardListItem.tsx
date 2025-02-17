'use client'
import Link from 'next/link'
import React from 'react'
import formatCustomDate from '@/utils/boardValidators/formatCustomDate'
import { ROUTES } from '@/constants/route'
import { useSearchParams } from 'next/navigation'
import { Post } from '../../_types/boardTypes'
import { formatValue } from '@/utils/statsValidators/formatNumber'
import { MessageSquare } from 'lucide-react'

interface Props {
   item: Post
}

export default function BoardListItem({ item }: Props) {
   const {
      id,
      title,
      nickname,
      createdAt,
      like = 0,
      views = 0,
      comment,
      deleted = false,
   } = item
   const params = useSearchParams()
   const page = params.get('page') || 1

   return (
      <section className="flex items-center  flex-wrap p-2">
         <span className="w-18 text-xs text-muted-foreground pr-2 text-ellipsis whitespace-nowrap text-left hidden sm:block sm:text-sm">
            {id}
         </span>

         {/* 제목 영역 */}
         <div className="flex-1 min-w-0">
            {deleted ? (
               <p className="text-muted-foreground text-xs sm:text-sm">
                  삭제된 게시물입니다.
               </p>
            ) : (
               <Link
                  href={`${ROUTES.BOARD}/${id}?page=${page}`}
                  className="flex items-center gap-1 group-hover:text-primary"
               >
                  <span className="truncate font-medium text-xs sm:text-sm">
                     {title}
                  </span>
                  {comment > 0 && (
                     <span className="flex items-center text-sm text-muted-foreground">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        {comment > 99 ? 99 : comment}
                     </span>
                  )}
               </Link>
            )}
         </div>
         <ul className=" gap-2 text-xs text-gray-400 text-center sm:flex hidden">
            <li className="font-bold text-start truncate w-32">
               {nickname || '닉네임'}
            </li>
            <li className="w-10">{formatCustomDate(createdAt)}</li>
            <li className="w-16">추천 {formatValue(like)}</li>
            <li className="w-16">조회 {formatValue(views)}</li>
         </ul>
      </section>
   )
}
