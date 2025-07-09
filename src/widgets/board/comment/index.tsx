'use client'

import { Separator } from '@/shared/shadcn/ui/separator'
import CommentForm from './comment-form'
import CommentHeader from './comment-header'
import CommentItem from './comment-item'
import { useComments } from './hooks'

interface Props {
   postId: string
}

export default function Comment({ postId }: Props) {
   const {
      commentsData,
      selectedCommentId,
      editingCommentId,
      refetch,
      handleCommentSelect,
      setEditingComment,
   } = useComments({ postId })

   return (
      <div className="my-2">
         <CommentHeader commentCount={commentsData.length} />
         <div className="my-2 space-y-1">
            {commentsData.map((data) => (
               <CommentItem
                  key={data.id}
                  commentData={data}
                  isEditing={editingCommentId === data.id}
                  setIsEditing={setEditingComment}
                  isSelected={selectedCommentId === data.id}
                  onSelect={() => handleCommentSelect(data.id)}
                  refetch={refetch}
               />
            ))}
         </div>
         <Separator className="my-4" />
         <CommentForm postId={postId} refetch={refetch} />
      </div>
   )
}
