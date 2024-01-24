'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import BoardList from '@/components/Board/BoradList'

interface BoardContentProps {
   page: number
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
export default function BoardContent({ page }: BoardContentProps) {
   const [boardData, setBoardData] = useState([])
   const router = useRouter()
   const [selectedItem, setSelectedItem] = useState('normal')

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
      <section className="max-w-[720px]">
         <div className="flex justify-between mt-2 ">
            <ul className="flex gap-1 font-bold">
               <li
                  role="presentation"
                  className={`p-1 ${
                     selectedItem === 'normal' ??
                     'border border-black border-b-0'
                  }`}
                  onClick={() => {
                     setSelectedItem('normal')
                     // router.refresh();
                  }}
               >
                  실시간
               </li>
               <li
                  role="presentation"
                  className={`p-1 ${
                     selectedItem === 'special' ??
                     ' border border-black border-b-0'
                  }`}
                  onClick={() => {
                     setSelectedItem('special')
                     // router.refresh();
                  }}
               >
                  초월글
               </li>
            </ul>

            <button type="submit" onClick={() => router.push('/board/create')}>
               글쓰기
            </button>
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
      </section>
   )
}
