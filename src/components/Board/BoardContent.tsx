'use client'

import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { validatePostQuery } from '@/utils/slugValidators/validatePostQuery'
import BoardList from './Content/BoardList'
import BoardTap from './Content/BoardTap'

enum TapName {
   RealTime = '실시간',
   Recommended = '추천글',
}

export default function BoardContent({ postData }) {
   const searchParams = useSearchParams()
   const search = searchParams.get('page')
   const pageNum = validatePostQuery.safeParse(search) ? Number(search) : 1

   const [selectedTap, setSelectedTap] = useState<TapName>(TapName.RealTime)

   return (
      <section className="px-0.5 w-full">
         {/* 게시판 태그 일반글 추천글 */}
         <BoardTap setSelectedTap={setSelectedTap} selectedTap={selectedTap} />
         {/* 게시글 리스트 */}
         <BoardList postData={postData} page={pageNum} />
      </section>
   )
}
