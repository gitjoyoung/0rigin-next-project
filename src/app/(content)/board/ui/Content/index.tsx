import type { Post } from '@/types/boardTypes'
import { nanoid } from 'nanoid'
import PostListItem from './PostListItem'

interface Props {
   postData: Post[]
}

export default function PostList({ postData }: Props) {
   if (!postData) return <p className="text-xl">무, 공, 허무 그리고 아포리아</p>
   return (
      <div className="border border-black w-full ">
         {Array.isArray(postData) &&
            postData.map((item: Post) => (
               <div
                  key={nanoid()}
                  className={`border-b last:border-b-0  hover:bg-gray-200 dark:hover:bg-gray-800 `}
               >
                  <PostListItem item={item} />
               </div>
            ))}
      </div>
   )
}
