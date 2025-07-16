import type { Database } from '@/shared/types'
import MarkDownViewer from './mark-down-viewer'
import PostHeader from './post-header'

interface Props {
   postData: Database['public']['Tables']['posts']['Row']
}

export default function PostView({ postData }: Props) {
   return (
      <section className="flex flex-col gap-3 ">
         <PostHeader {...postData} />
         <MarkDownViewer content={postData.content as string} />
      </section>
   )
}
