import Link from 'next/link'
import React from 'react'
import formatCustomDate from '@/utils/boardValidators/formatCustomDate'
import { formatNumberWithUnit } from '@/utils/boardValidators/formatNumberWithUnit'
import { Post } from '@/types/boardTypes'
import { ROUTES } from '@/constants/route'

interface Props {
   item: Post
   page: number
}

export default function BoardListItem({ item, page }: Props) {
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
   return (
      <section className="flex items-center  flex-wrap p-2  ">
         <div className="flex-auto text-sm gap-2 justify-start flex  items-center w-72">
            <p className="border   px-0.5  ">{id}</p>
            {deleted ? (
               <h1 className="line-clamp-1 text-gray-400 ">
                  삭제된 게시물 입니다.
               </h1>
            ) : (
               <Link
                  className="flex gap-2 "
                  href={`${ROUTES.BOARD}/${page}/${id}`}
               >
                  <h1 className="line-clamp-1 ">{title}</h1>
                  <p className="text-gray-400 text-sm mx-1">
                     {comment && `[${comment}]`}
                  </p>
               </Link>
            )}
         </div>
         <ul className=" flex gap-2 text-xs text-gray-400 text-center ">
            <li className="font-bold w-[100px] text-start line-clamp-1">
               {nickname || '닉네임'}
            </li>
            <li className="w-[50px]"> {formatCustomDate(createdAt)} </li>
            <li className="w-[50px]">추천 {formatNumberWithUnit(like)}</li>
            <li className="w-[50px]">조회 {formatNumberWithUnit(views)}</li>
         </ul>
      </section>
   )
}
