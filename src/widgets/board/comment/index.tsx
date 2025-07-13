'use client'

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
         <div className="flex flex-col ">
            {commentsData.map((data) => (
               <div
                  key={data.id}
                  className="border-b border-gray-200 dark:border-gray-700 last:border-b-0"
               >
                  <CommentItem
                     key={data.id}
                     commentData={data}
                     isEditing={editingCommentId === data.id}
                     setIsEditing={setEditingComment}
                     isSelected={selectedCommentId === data.id}
                     onSelect={() => handleCommentSelect(data.id)}
                     refetch={refetch}
                  />
               </div>
            ))}
         </div>
         <CommentForm postId={postId} refetch={refetch} />
      </div>
   )
}
