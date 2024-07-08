'use client'
import Link from 'next/link'
import React, { use } from 'react'
import formatCustomDate from '@/utils/boardValidators/formatCustomDate'
import { formatNumberWithUnit } from '@/utils/boardValidators/formatNumberWithUnit'
import { ROUTES } from '@/constants/route'
import { useSearchParams } from 'next/navigation'
import { Post } from '../../_types/boardTypes'

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
      <section className="flex items-center  flex-wrap p-2  ">
         <div className="flex-auto text-sm gap-2 justify-start flex  items-center w-72">
            <p className="border px-0.5  ">{id}</p>
            {deleted ? (
               <h1 className="line-clamp-1 text-gray-400 ">
                  삭제된 게시물 입니다.
               </h1>
            ) : (
               <Link
                  className="flex gap-2 "
                  href={`${ROUTES.BOARD}/${id}?page=${page}`}
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
