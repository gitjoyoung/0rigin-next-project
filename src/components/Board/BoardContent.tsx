'use client'

import React, { useState } from 'react'
import { Post } from '@/types/boardTypes'
import { BoardTapButton } from './Content/BoardTapButton'
import BoardList from './Content/BoardList'

interface Props {
   postData: Post[]
   page: number
}
enum TapName {
   RealTime = '실시간',
   Recommended = '추천글',
}
export default function BoardContent({ postData, page }: Props) {
   const [selectedTap, setSelectedTap] = useState<TapName>(TapName.RealTime)

   return (
      <section className="px-0.5 w-full">
         {/* 게시판 태그 일반글 추천글 */}
         <BoardTapButton
            setSelectedTap={setSelectedTap}
            selectedTap={selectedTap}
         />
         {/* 게시글 리스트 */}
         <BoardList postData={postData} page={page} />
      </section>
   )
}
