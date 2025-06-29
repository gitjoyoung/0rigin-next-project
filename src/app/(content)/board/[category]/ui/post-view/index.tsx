import type { Post } from '@/entities/post/types'
import MarkDownViewer from './mark-down-viewer'
import PostHeader from './post-header'

interface Props {
   postData: Partial<Post>
}

export default function PostView({ postData }: Props) {
   return (
      <section className="flex flex-col gap-3 ">
         {/* 글제목 */}
         <PostHeader post={postData} />
         {/* 글내용 마크다운 뷰어 */}
         <div className="min-h-[200px]">
            <MarkDownViewer content={postData.content} />
         </div>
         {/* 싫어요,좋아요  버튼 */}
      </section>
   )
}
