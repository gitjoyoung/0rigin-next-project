import { Post, TopPost } from '@/types/boardTypes'
import { v4 as uuid4 } from 'uuid'
import BoardListItem from './BoardListItem'

interface Props {
   postData: Post[] | TopPost[]
}
export default function BoardList({ postData }: Props) {
   if (postData === undefined)
      return (
         <div className="border px-3 border-white w-full h-44 flex items-center ">
            <p className="text-xl">무, 공, 허무 그리고 아포리아</p>
         </div>
      )
   return (
      <div className="border border-black w-full ">
         {Array.isArray(postData) &&
            postData.map((item: Post) => (
               <div
                  key={uuid4()}
                  className={`border-b last:border-b-0  hover:bg-gray-100 `}
               >
                  <BoardListItem item={item} />
               </div>
            ))}
      </div>
   )
}
