import type { Post } from '@/entities/post/types'
import MarkDownViewer from './mark-down-viewer'
import PostHeader from './post-header'

interface Props {
   postData: Partial<Post>
}

export default function PostView({ postData }: Props) {
   return (
      <section className="flex flex-col gap-3 ">
         <PostHeader {...postData} />
         <MarkDownViewer content={postData.content} />
      </section>
   )
}
