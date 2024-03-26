'use client'

import BoardComment from '@/components/Board/Comment/BoardCommentsList'
import { useEffect, useState } from 'react'
import { fetchPostById } from '@/app/api/board/post/fetchPostApi'
import { Post } from '@/types/boardTypes'
import { updateIncreaseViews } from '@/app/api/board/post/updatePostApi'
import BoardReadTitle from './BoardReadTitle'
import BoardUpdateButton from './BoardUpdateButton'
import BoardLikeButton from './BoardLikeButton'
import BoardNavButton from './BoardNavButton'
import MarkDownViewer from './MarkDownViewer'

interface Props {
   postId: string
}

export default function BoardRead({ postId }: Props) {
   const [readData, setReadData] = useState<Post | null>(null)

   useEffect(() => {
      fetchPostById(postId).then(async (data) => {
         if (data === null) {
            return
         }
         await updateIncreaseViews(postId)
         setReadData(data)
      })
   }, [postId])

   /** 모달 관련 */

   if (readData === null) {
      return null
   }
   const { title, nickname, like, createdAt, views, content, dislike } =
      readData
   // 데이타가 있을때
   return (
      <section className="mt-1 ">
         {/* 글제목 */}
         <BoardReadTitle
            title={title}
            nickname={nickname}
            like={like}
            date={createdAt}
            views={views}
         />
         {/* 글 수정  , 삭제 버튼 */}
         <BoardUpdateButton postId={postId} />
         {/* 글내용 마크다운 뷰어 */}
         <MarkDownViewer content={content} />

         {/* 싫어요,좋아요  버튼 */}
         <BoardLikeButton postId={postId} like={like} dislike={dislike} />

         {/* 댓글 컴포넌트  */}
         <BoardComment postId={postId} />
         {/* 이전 목록 다음 글 이동 */}
         <BoardNavButton postID={postId} />
      </section>
   )
}
