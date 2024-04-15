import React from 'react'
import { Post } from '@/types/boardTypes'
import { v4 as uuid4 } from 'uuid'
import BoardListItem from './BoardListItem'

interface Props {
   postData: Post[]
   page: number
}
export default function BoardList({ postData, page }: Props) {
   return (
      <div className="border border-black ">
         {Array.isArray(postData) &&
            postData.map((item: Post) => (
               <div
                  key={uuid4()}
                  className={`border-b last:border-b-0  hover:bg-gray-100 `}
               >
                  <BoardListItem item={item} page={page} />
               </div>
            ))}
      </div>
   )
}
