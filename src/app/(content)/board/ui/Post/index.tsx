import { nanoid } from 'nanoid'
import type { Post } from '../../types/post'
import PostListItem from './PostListItem'

interface Props {
   postData: Post[]
}

export default function PostList({ postData }: Props) {
   if (!postData) return <p className="text-xl">무, 공, 허무 그리고 아포리아</p>
   return (
      <div className="border dark:border-gray-700 border-gray-200 w-full ">
         <div className="flex items-center py-1 px-1 font-semibold border-b bg-gray-100 dark:bg-gray-700 text-xs sm:text-sm">
            <p className="w-14 text-center ">번호</p>
            <p className="flex-1 min-w-0 text-center">제목</p>
            <div className=" gap-2 text-center sm:flex hidden">
               <p className="w-32 px-2">작성자</p>
               <p className="w-12">작성일</p>
               <p className="w-16">조회</p>
               <p className="w-16">추천</p>
            </div>
         </div>
         {Array.isArray(postData) &&
            postData.map((item: Post) => (
               <div
                  key={nanoid()}
                  className={`border-b last:border-b-0 hover:bg-gray-200 dark:hover:bg-gray-800`}
               >
                  <PostListItem item={item} />
               </div>
            ))}
      </div>
   )
}
