'use client'
import { useState } from 'react'
import { Post, TopPost } from '../../_types/boardTypes'
import BoardList from './BoardList'

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
         <BoardList postData={postData} />
      </div>
   )
}
