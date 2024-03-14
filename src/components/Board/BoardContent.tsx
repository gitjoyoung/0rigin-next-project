'use client'

import React, { useState } from 'react'
import { Post } from '@/types/boardTypes'
import BoardList from './BoardList'

interface Props {
   postData: Post[]
   page: number
}
function TapMenu({ text, tapName, setSelectedTap, selectedTap }) {
   return (
      <li
         role="presentation"
         className={`p-2 
   hover:bg-black
   hover:text-white
   ${
      selectedTap === tapName
         ? 'border border-black border-b-0'
         : 'border border-white border-b-0'
   }`}
         onClick={() => {
            setSelectedTap(tapName)
            // router.refresh();
         }}
      >
         <p className="font-bold">{text}</p>
      </li>
   )
}

export default function BoardContent({ postData, page }: Props) {
   const [selectedTap, setSelectedTap] = useState<'normal' | 'best'>('normal')

   return (
      <section className="px-0.5 w-full">
         {/* 게시판 태그 일반글 추천글 */}
         <ul className="flex gap-1 ">
            <TapMenu
               text="실시간"
               tapName="normal"
               setSelectedTap={setSelectedTap}
               selectedTap={selectedTap}
            />
            <TapMenu
               text="추천글(개발중...)"
               tapName="best"
               setSelectedTap={setSelectedTap}
               selectedTap={selectedTap}
            />
         </ul>
         {/* 게시글 리스트 */}
         <BoardList postData={postData} page={page} />
      </section>
   )
}
