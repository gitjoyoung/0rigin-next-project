'use client'

import { ROUTES } from '@/constants/route'
import formatDate from '@/shared/utils/validators/board/format-date'
import { formatValue } from '@/shared/utils/validators/statsValidators/formatNumber'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import type { IPost } from '../../types/post-type'

interface Props {
   item: IPost
}

export default function PostListItem({ item }: Props) {
   const {
      id,
      title,
      author,
      created_at,
      views = 0,
      likes,
      comments,
      status,
   } = item
   const page = useSearchParams().get('page') || 1

   return (
      <section className="flex items-center  flex-wrap py-2  px-1">
         {/* 번호 영역 */}
         <span className="w-14 text-[12px] text-center">{id}</span>

         {/* 제목 영역 */}
         <div className="flex-1 px-1">
            {status === 'deleted' ? (
               <p className="text-muted-foreground text-xs sm:text-sm">
                  삭제된 게시물입니다.
               </p>
            ) : (
               <Link
                  href={`${ROUTES.BOARD}/${id}?page=${page}`}
                  className="flex items-center gap-1 group-hover:text-primary dark:group-hover:text-primary"
               >
                  <h2 className="truncate font-medium text-xs sm:text-sm">
                     {title}
                  </h2>
                  {comments > 0 && (
                     <span className="flex items-center text-xs text-muted-foreground">
                        [{comments}]
                     </span>
                  )}
               </Link>
            )}
         </div>

         {/* 작성자, 작성일, 조회, 추천 영역 */}
         <div className="gap-2 text-xs text-gray-400 text-center sm:flex hidden">
            <p className="font-bold text-start w-32 px-2 flex justify-center">
               {author?.name || '닉네임'}
            </p>
            <p className="w-12 flex justify-center">{formatDate(created_at)}</p>
            <p className="w-16 flex justify-center">
               조회 {formatValue(views)}
            </p>
            <p className="w-16 flex justify-center">
               추천 {formatValue(likes)}
            </p>
         </div>
      </section>
   )
}
