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
   const { id, title, nickname, createdAt, like = 0, views = 0, comment } = item
   return (
      <section className="flex items-center  flex-wrap p-2  ">
         <div className="flex-auto gap-2 justify-start flex  w-72">
            <p className="border text-sm  px-0.5 ">{id}</p>
            <Link
               className="flex gap-2 items-center"
               href={`${ROUTES.BOARD}/${page}/${id}`}
            >
               <h1 className="line-clamp-1 ">{title}</h1>
               <p className="text-gray-400 text-sm mx-1">
                  {comment && `[${comment}]`}
               </p>
            </Link>
            {/* 조회수 , 추천수가 많은 경우  아이콘 보이기  */}
         </div>
         <ul className=" flex gap-2 text-xs text-gray-400  ">
            <li className="font-bold">{nickname || '닉네임'}</li>
            <li className="w-18"> {formatCustomDate(createdAt)} </li>
            <li className="w-18">추천 {formatNumberWithUnit(like)}</li>
            <li className="w-18">조회 {formatNumberWithUnit(views)}</li>
         </ul>
      </section>
   )
}
