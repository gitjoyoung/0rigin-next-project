import { Post } from '@/types/boardTypes'
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
   const { title, nickname, like, createdAt, views, content, dislike } =
      readData

   return (
      <section>
         {/* 글제목 */}
         <BoardReadHeader
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
         {/* 이전 목록 다음 글 이동 */}
         <BoardNavButton postID={postId} />
      </section>
   )
}
