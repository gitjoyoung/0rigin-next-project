'use client'

import BoardComment from '@/components/Board/Comment/BoardCommentsList'
import { Post } from '@/types/boardTypes'
import { updateIncreaseViews } from '@/app/api/board/post/updatePostApi'
import { useEffect } from 'react'
import BoardUpdateButton from './BoardUpdateButton'
import BoardLikeButton from './BoardLikeButton'
import BoardNavButton from './BoardNavButton'
import MarkDownViewer from './MarkDownViewer'
import BoardReadHeader from './BoardReadHeader'

interface Props {
   postId: string
   readData: Post | null
}

export default function BoardRead({ postId, readData }: Props) {
   useEffect(() => {
      const updateViews = async () => {
         await updateIncreaseViews(postId)
      }
      updateViews() // 조회수 증가
   }, [])

   if (readData === null) {
      return (
         <div className="p-3">
            <h1>데이타가 없습니다.</h1>
         </div>
      )
   }

   // 데이타가 있지만 삭제된 글일 경우
   if (readData.deleted) {
      return (
         <div className="p-3">
            <h1>삭제된 게시글 입니다.</h1>
         </div>
      )
   }
   return (
      <section>
         {/* 글제목 */}
         <BoardReadHeader
            title={readData.title}
            nickname={readData.nickname}
            like={readData.like}
            date={readData.createdAt}
            views={readData.views}
         />
         {/* 글 수정  , 삭제 버튼 */}
         <BoardUpdateButton postId={postId} />
         {/* 글내용 마크다운 뷰어 */}
         <MarkDownViewer content={readData.content} />

         {/* 싫어요,좋아요  버튼 */}
         <BoardLikeButton
            postId={postId}
            like={readData.like}
            dislike={readData.dislike}
         />

         {/* 댓글 컴포넌트  */}
         <BoardComment postId={postId} />
         {/* 이전 목록 다음 글 이동 */}
         <BoardNavButton postID={postId} />
      </section>
   )
}
