'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import BoardList from '@/components/Board/BoradList'
import Pagination from './Pagination'

interface BoardContentProps {
   page: number
   tap: string
}

interface BoardItem {
   title: string
   timestamp: Date
   views: number
   like: number
   comments: number
   id: string
   nickname: string
   no: number
}
export default function BoardContent({ page, tap }: BoardContentProps) {
   const [boardData, setBoardData] = useState([])
   const router = useRouter()
   const [selectedTap, setSelectedTap] = useState(tap)

   const fetchBoardData = async () => {
      const options = {
         url: `${process.env.NEXT_PUBLIC_API_URL}board?_sort=-timestamp&_page=${page}&_limit=20`,
         method: 'get',
      }

      try {
         const response = await axios(options)
         setBoardData(response.data)
      } catch (error) {
         console.log(error)
      }
   }
   useEffect(() => {
      fetchBoardData()
   }, [])

   if (boardData === null) {
      return <>빈 페이지</>
   }
   return (
      <section className="w-full ">
         <div className="flex justify-between mt-2  items-center">
            <ul className="flex gap-1 font-bold">
               <li
                  role="presentation"
                  className={`p-2 
                  hover:bg-black
                  hover:text-white
                  ${
                     selectedTap === 'normal'
                        ? 'border border-black border-b-0'
                        : 'border border-white border-b-0'
                  }`}
                  onClick={() => {
                     setSelectedTap('normal')
                     // router.refresh();
                  }}
               >
                  <p>실시간</p>
               </li>
               <li
                  role="presentation"
                  className={`p-2 
                  hover:bg-black
                  hover:text-white
                  ${
                     selectedTap === 'special'
                        ? ' border border-black border-b-0'
                        : 'border border-white border-b-0'
                  }`}
                  onClick={() => {
                     setSelectedTap('special')
                     // router.refresh();
                  }}
               >
                  <p>추천글(개발중...)</p>
               </li>
            </ul>
         </div>

         <div className="border border-black ">
            {Array.isArray(boardData) &&
               boardData.map((item: BoardItem) => (
                  <div
                     key={item.id}
                     className="border-b last:border-b-0 hover:bg-gray-100  "
                  >
                     <BoardList
                        title={item.title}
                        timestamp={item.timestamp}
                        views={item.views}
                        like={item.like}
                        comments={item.comments}
                        id={item.id}
                        nickname={item.nickname}
                        no={item.no}
                     />
                  </div>
               ))}
         </div>
         <Pagination
            totalPages={1001212}
            onPageChange={(e) => {
               console.log(e)
            }}
         />
      </section>
   )
}
