'use client'

import CommentList from './comment-list'
import CommentHeader from './common/comment-header'
import CommentForm from './form'
import { useComments } from './hooks'

interface Props {
   postId: string
}

export default function Comment({ postId }: Props) {
   const { commentsData, refetch } = useComments({ postId })

   return (
      <div className="my-2">
         <CommentHeader commentCount={commentsData.length} />
         <CommentList commentsData={commentsData} refetch={refetch} />
         <CommentForm postId={postId} refetch={refetch} />
      </div>
   )
}
