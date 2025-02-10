'use client'
import { useState } from 'react'
import BoardList from './BoardList'
import { BoardTapButton } from './BoardTapButton'
import { Post, TopPost } from '../../_types/boardTypes'
import currency from 'currency.js'

interface Props {
   postData: Post[]
   topData?: TopPost[]
}

export default function BoardContent({ postData, topData }: Props) {
   const [selectedTab, setSelectedTab] = useState('realtime')

   const handleTabClick = (tabName: string) => {
      setSelectedTab(tabName)
   }

   return (
      <div className="px-0.5 w-full">
         {/* 게시판 태그 일반글 추천글 */}
         <BoardTapButton
            tapName="실시간"
            isActive={selectedTab === 'realtime'}
            onClick={() => handleTabClick('realtime')}
         />
         <BoardTapButton
            tapName="인기글"
            isActive={selectedTab === 'popular'}
            onClick={() => handleTabClick('popular')}
         />
         {/* 게시글 리스트 */}
         {selectedTab === 'realtime' ? (
            <BoardList postData={postData} />
         ) : (
            <BoardList postData={topData} />
         )}
      </div>
   )
}
