import type { CommentData } from '@/types/commentTypes'

interface Props {
   commentData: CommentData
   isEditing: boolean
   setIsEditing: (id: string | null) => void
}

export default function CommentItem({
   commentData,
   isEditing,
   setIsEditing,
}: Props) {
   const { id, content, nickname, createdAt } = commentData

   return (
      <div className="border-b py-2">
         <div className="flex items-center gap-2">
            <span className="font-semibold">{nickname}</span>
            <span className="text-sm text-gray-500">{createdAt}</span>
         </div>
         <p className="mt-2">{content}</p>
      </div>
   )
}
