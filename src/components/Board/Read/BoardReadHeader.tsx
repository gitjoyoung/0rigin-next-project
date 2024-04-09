import React from 'react'

interface Props {
   title: string
   nickname: string
   like: number
   date: string
   views: number
}

export default function BoardReadHeader({
   title,
   nickname,
   like = 0,
   date,
   views,
}: Props) {
   return (
      <div className="border-b  grid gap-2 pt-2 pb-2 px-1">
         <div className="flex justify-between items-center">
            <h1 className="text-2xl">{title}</h1>
         </div>
         <ul className=" flex gap-2  text-xs">
            <li className="font-bold max:w-[90px] line-clamp-1">{nickname}</li>
            <li>
               <span>|</span>
            </li>
            <li>
               추천 : <span>{like}</span>
            </li>
            <li>
               <span>|</span>
            </li>
            <li>
               작성시간 : <span>{date}</span>
            </li>
            <li>
               <span>|</span>
            </li>
            <li>
               조회 : <span>{views}</span>
            </li>
         </ul>
      </div>
   )
}
