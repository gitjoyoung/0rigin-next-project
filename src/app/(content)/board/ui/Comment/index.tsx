'use client'

import { fetchComments } from '@/service/board/commentApi'
import { nanoid } from 'nanoid'
import { useEffect, useState } from 'react'
import BoardCommentForm from './CommentForm'
import BoardCommentHeader from './CommentHeader'
import BoardCommentItem from './CommentItem'

interface Props {
   postId: string
}

export default function CommentList({ postId }: Props) {
   const [comments, setComments] = useState([])
   const fetchData = async (postId: string) => {
      const commentsData = await fetchComments(postId)
      setComments(commentsData)
   }
   useEffect(() => {
      fetchData(postId)
   }, [postId])

   return (
      <div className="my-2">
         {/* 댓글 헤더 */}
         <BoardCommentHeader length={comments.length} />

         {/* 댓글 리스트 */}
         {comments.map((data) => (
            <BoardCommentItem key={nanoid()} commentData={data} />
         ))}

         {/* 댓글 작성 폼 */}
         <BoardCommentForm postId={postId} />
      </div>
   )
}
