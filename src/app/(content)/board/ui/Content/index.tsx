'use client'
import type { Post } from '@/types/boardTypes'
import BoardList from './BoardList'

interface Props {
   postData: Post[]
}

export default function BoardContent({ postData }: Props) {
   return (
      <div className="px-0.5 w-full">
         <BoardList postData={postData} />
      </div>
   )
}
