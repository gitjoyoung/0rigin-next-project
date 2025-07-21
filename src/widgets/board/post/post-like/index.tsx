'use client'

import LikeButton from './like-button'

interface Props {
   postId: string
}

export default function PostLike({ postId }: Props) {
   return <LikeButton postId={postId} />
}
