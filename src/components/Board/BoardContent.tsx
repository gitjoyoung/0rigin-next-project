'use client'

import React, { useState } from 'react'
import { Post } from '@/types/boardTypes'
import BoardList from './BoardList'
import { BoardTapButton } from './BoardTapButton'

interface Props {
   postData: Post[]
   page: number
}

export default function BoardContent({ postData, page }: Props) {
   const [selectedTap, setSelectedTap] = useState<'normal' | 'best'>('normal')

   return (
      <section className="px-0.5 w-full">
         {/* 게시판 태그 일반글 추천글 */}
         <ul className="flex gap-1 ">
            <BoardTapButton
               text="실시간"
               tapName="normal"
               setSelectedTap={setSelectedTap}
               selectedTap={selectedTap}
            />
            <BoardTapButton
               text="추천글"
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
