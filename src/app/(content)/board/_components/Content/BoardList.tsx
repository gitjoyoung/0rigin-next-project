import BoardListItem from './BoardListItem'
import { Post, TopPost } from '../../_types/boardTypes'
import { nanoid } from 'nanoid'

interface Props {
   postData: Post[] | TopPost[]
}
export default function BoardList({ postData }: Props) {
   if (!postData)
      return (
         <>
            <div className="border border-black  px-3  w-full h-44 flex items-center ">
               <p className="text-xl">무, 공, 허무 그리고 아포리아</p>
            </div>
         </>
      )
   return (
      <div className="border border-black w-full ">
         {Array.isArray(postData) &&
            postData.map((item: Post) => (
               <div
                  key={nanoid()}
                  className={`border-b last:border-b-0  hover:bg-gray-100 `}
               >
                  <BoardListItem item={item} />
               </div>
            ))}
      </div>
   )
}
