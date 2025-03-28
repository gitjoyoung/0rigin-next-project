import { Post } from '@/types/boardTypes'
import BoardLikeButton from './BoardLikeButton'
import MarkDownViewer from './MarkDownViewer'
import PostHeader from './PostHeader'

interface Props {
   readData: Post
}

export default function PostRead({ readData }: Props) {
   const { title, nickname, like, createdAt, views, content, dislike, postId } =
      readData

   return (
      <section>
         {/* 글제목 */}
         <PostHeader
            title={title}
            nickname={nickname}
            like={like}
            date={createdAt}
            views={views}
            postId={postId}
         />

         {/* 글내용 마크다운 뷰어 */}
         <div className="my-10 min-h-[200px]">
            <MarkDownViewer content={content} />
         </div>
         {/* 싫어요,좋아요  버튼 */}
         <BoardLikeButton postId={postId} like={like} dislike={dislike} />
      </section>
   )
}
