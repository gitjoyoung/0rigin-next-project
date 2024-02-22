'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BoardList from '@/components/Board/BoradList'
import Pagination from './Pagination'
import { fetchPosts } from '@/app/api/board/fetchPostApi'

interface BoardContentProps {
   page: number
   tap: string
}

interface BoardPost {
   body: string // "ㅁㄴㅇasfasf"와 같은 문자열
   category: string // "any"와 같은 문자열
   createdAt: string // "2024년 2월 21일 오후 1시 56분 44초 UTC+9"와 같은 타임스탬프, 문자열로 처리
   isPublic: boolean // true 또는 false 값
   nickname: string // "asdasd"와 같은 문자열
   number: number // 34와 같은 번호
   password: string // "asd"와 같은 문자열
   title: string // "ㅁㄴㅇㅁㄴㅇ"와 같은 문자열
}

export default function BoardContent({ page, tap }: BoardContentProps) {
   const [boardData, setBoardData] = useState([])
   const [selectedTap, setSelectedTap] = useState(tap)

   const fetchBoardData = async () => {
      const postData = await fetchPosts()
      if (postData) {
         setBoardData(postData)
      }
   }

   // const options = {
   //    url: `${process.env.NEXT_PUBLIC_API_URL}board?_sort=-timestamp&_page=${page}&_limit=20`,
   //    method: 'get',
   // }

   // try {
   //    const response = await axios(options)
   //    setBoardData(response.data)
   // } catch (error) {
   //    console.log(error)
   // }

   useEffect(() => {
      fetchBoardData()
   }, [selectedTap, page])

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

         <div className="border border-black min-h-96 ">
            {Array.isArray(boardData) &&
               boardData.map((item: BoardPost) => (
                  <div
                     key={item.number}
                     className="border-b last:border-b-0 hover:bg-gray-100  "
                  >
                     <BoardList
                        title={item.title}
                        createdAt={item.createdAt}
                        views={item.number}
                        like={item.number}
                        comments={item.number}
                        id={item.nickname}
                        nickname={item.nickname}
                        no={item.number}
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
