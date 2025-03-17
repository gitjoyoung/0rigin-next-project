'use client'

import React, { useEffect, useState } from 'react'
import BoardCommentForm from './CommentForm'
import BoardCommentHeader from './CommentHeader'
import BoardCommentItem from './CommentItem'
import { fetchComments } from '@/service/board/commentApi'
import { CommentData } from '../../_types/commentTypes'
import { nanoid } from 'nanoid'

interface Props {
   postId: string
}

export default function CommentList({ postId }: Props) {
   const [comments, setComments] = useState([])
   const [loading, setLoading] = useState(true)
   const fetchData = async (postId: string) => {
      const commentsData = await fetchComments(postId)
      setComments(commentsData)
   }
   useEffect(() => {
      fetchData(postId).then(() => setLoading(false))
   }, [postId])

   return (
      <div className=" my-2">
         {/* 댓글 헤더 */}
         <BoardCommentHeader length={comments.length} />

         {/* 댓글 리스트 */}
         {!loading &&
            comments.map((data: CommentData) => (
               <BoardCommentItem key={nanoid()} commentData={data} />
            ))}

         {/* 댓글 작성 폼 */}
         <BoardCommentForm postId={postId} fetchData={fetchData} />
      </div>
   )
}
