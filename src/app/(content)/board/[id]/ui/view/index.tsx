import type { IPost } from '../../../types/post-type'
import MarkDownViewer from './mark-down-viewer'
import PostHeader from './post-header'

export default function PostView({
   title,
   nickname,
   created_at,
   view_count,
   content,
   id,
   likes,
}: IPost) {
   return (
      <section>
         {/* 글제목 */}
         <PostHeader
            title={title}
            author={nickname}
            likes={likes}
            created_at={created_at}
            views={view_count}
            id={id}
         />

         {/* 글내용 마크다운 뷰어 */}
         <div className="my-10 min-h-[200px] px-1">
            <MarkDownViewer content={content} />
         </div>
         {/* 싫어요,좋아요  버튼 */}
      </section>
   )
}
