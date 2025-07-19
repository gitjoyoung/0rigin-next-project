import { Button } from '@/shared/shadcn/ui/button'
import type { Tables } from '@/shared/types'
import { ChevronDown, Eye } from 'lucide-react'
import { useState } from 'react'
import CommentItem from './comment-item'

interface Props {
   commentsData: Tables<'comments'>[]
   refetch: () => void
}

const COMMENTS_PER_PAGE = 10

export default function CommentList({ commentsData, refetch }: Props) {
   const [isSelected, setIsSelected] = useState<number | null>(null)
   const [displayCount, setDisplayCount] = useState(COMMENTS_PER_PAGE)

   const handleSelect = (id: number) => {
      setIsSelected(id)
   }

   const handleLoadMore = () => {
      setDisplayCount((prev) =>
         Math.min(prev + COMMENTS_PER_PAGE, commentsData.length),
      )
   }

   const handleShowAll = () => {
      setDisplayCount(commentsData.length)
   }

   const displayedComments = commentsData.slice(0, displayCount)
   const hasMoreComments = displayCount < commentsData.length

   return (
      <div className="flex flex-col">
         {displayedComments.map((data) => (
            <div
               key={data.id}
               className="border-b border-gray-200 dark:border-gray-700 last:border-b-0"
            >
               <CommentItem
                  commentData={data}
                  refetch={refetch}
                  isSelected={isSelected}
                  onSelect={handleSelect}
               />
            </div>
         ))}

         {hasMoreComments && (
            <div className="relative flex items-center justify-center">
               <Button
                  variant="ghost"
                  onClick={handleLoadMore}
                  className="flex items-center gap-2 text-sm w-full rounded-none"
               >
                  <ChevronDown className="w-4 h-4" />
                  더보기 ({commentsData.length - displayCount})
               </Button>
               <Button
                  variant="ghost"
                  onClick={handleShowAll}
                  className="absolute right-0 flex items-center gap-1 text-xs rounded-none"
                  size="sm"
               >
                  <Eye className="w-3 h-3" />
                  전체보기
               </Button>
            </div>
         )}
      </div>
   )
}
