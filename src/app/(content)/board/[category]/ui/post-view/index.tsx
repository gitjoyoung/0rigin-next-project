import type { Post } from '@/entities/post/types'
import MarkDownViewer from './mark-down-viewer'
import PostHeader from './post-header'

export default function PostView({
   title,
   nickname,
   created_at,
   content,
   id,
}: Post) {
   return (
      <section className="flex flex-col gap-3 ">
         {/* 글제목 */}
         <PostHeader
            title={title}
            author={nickname}
            likes={0}
            created_at={created_at}
            views={0}
            id={id}
         />
         {/* 글내용 마크다운 뷰어 */}
         <div className="min-h-[200px]">
            <MarkDownViewer content={content.markdown} />
         </div>
         {/* 싫어요,좋아요  버튼 */}
      </section>
   )
}
