'use client'
import { Button } from '@/shared/shadcn/ui/button'
import { RefreshCcw } from 'lucide-react'

interface Props {
   commentCount: number
   refetch: () => void
}

const COMMENT_HEADER_DATA = {
   title: '전체 코멘트',
   count: '개',
   refresh: '새로고침',
}

export default function CommentHeader({
   commentCount: commentLength,
   refetch,
}: Props) {
   return (
      <div className="border-b border-t border-gray-200 dark:border-gray-700 flex justify-between text-xs  p-1">
         <div className="flex text-gray-700 dark:text-gray-300 items-center gap-2">
            <h1 className="font-bold">{COMMENT_HEADER_DATA.title}</h1>
            <p className="text-red-500">{commentLength && commentLength}</p>
            <p>{COMMENT_HEADER_DATA.count}</p>
         </div>
         <Button
            variant="link"
            className="p-1 py-0 text-xs flex gap-1  text-black dark:text-white 
            items-center h-5"
            onClick={() => refetch()}
         >
            <RefreshCcw className="h-4 w-4" />
            <p className="text-xs">{COMMENT_HEADER_DATA.refresh}</p>
         </Button>
      </div>
   )
}
