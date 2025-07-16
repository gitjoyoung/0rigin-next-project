import { useState } from 'react'
import CommentItem from './comment-item'

interface Props {
   commentsData: any[]
   refetch: () => void
}

export default function CommentList({ commentsData, refetch }: Props) {
   const [isSelected, setIsSelected] = useState()
   return (
      <div className="flex flex-col ">
         {commentsData.map((data) => (
            <div
               key={data.id}
               className="border-b border-gray-200 dark:border-gray-700 last:border-b-0"
            >
               <CommentItem
                  commentData={data}
                  refetch={refetch}
                  isSelected={isSelected}
                  onSelect={() => setIsSelected(data.id)}
               />
            </div>
         ))}
      </div>
   )
}
