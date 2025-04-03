import type { IPost } from '../../types/post-type'
import BoardLikeButton from './board-like-button'
import MarkDownViewer from './mark-down-viewer'
import PostHeader from './post-header'

export default function PostRead({
   title,
   author,
   likes,
   created_at,
   views,
   content,
   id,
}: IPost) {
   return (
      <section>
         {/* 글제목 */}
         <PostHeader
            title={title}
            author={author}
            likes={likes}
            created_at={created_at}
            views={views}
            id={id}
         />

         {/* 글내용 마크다운 뷰어 */}
         <div className="my-10 min-h-[200px]">
            <MarkDownViewer content={content} />
         </div>
         {/* 싫어요,좋아요  버튼 */}
         <BoardLikeButton postId={id} like={likes} />
      </section>
   )
}
