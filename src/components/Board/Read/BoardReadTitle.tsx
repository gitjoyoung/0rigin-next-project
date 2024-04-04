import React from 'react'

interface Props {
   title: string
   nickname: string
   like: number
   date: string
   views: number
}

export default function BoardReadTitle({
   title,
   nickname,
   like = 0,
   date,
   views,
}: Props) {
   return (
      <div className="border-b border-gray grid gap-2 py-3 px-1">
         <div className="flex justify-between items-center">
            <h1 className="text-2xl">{title}</h1>
         </div>
         <ul className="list-none flex gap-2  text-xs">
            <li className="font-bold w-[90px] line-clamp-1">{nickname}</li>
            <li>
               <span>|</span>
            </li>
            <li className="">
               추천 : <span className="">{like}</span>
            </li>
            <li>
               <span>|</span>
            </li>
            <li className="">
               작성시간 : <span className="">{date}</span>
            </li>
            <li>
               <span>|</span>
            </li>
            <li className="">
               조회 : <span className="">{views}</span>
            </li>
         </ul>
      </div>
   )
}
