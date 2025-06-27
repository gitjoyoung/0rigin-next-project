'use client'

import LikeButton from './like-button'
import LikeUserList from './like-user-list'

interface Props {
   postId: string
}

export default function PostLike({ postId }: Props) {
   return (
      <div className="flex flex-col items-center my-5 space-y-2">
         <LikeButton postId={postId} />
         <LikeUserList postId={postId} />
      </div>
   )
}
