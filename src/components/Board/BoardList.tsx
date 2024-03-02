import React from 'react'
import BoardListItem from './BoardListItem'

interface BoardPost {
   id: string
   body: string
   category: string
   createdAt: string
   isPublic: boolean
   nickname: string
   number: number
   title: string
}

export default function BoardList({ boardData }: { boardData: BoardPost[] }) {
   return (
      <div className="border border-black min-h-96 ">
         {Array.isArray(boardData) &&
            boardData.map((item: BoardPost) => (
               <div
                  key={item.number}
                  className="border-b last:border-b-0 hover:bg-gray-100  "
               >
                  <BoardListItem
                     title={item.title}
                     createdAt={item.createdAt}
                     views={item.number}
                     like={item.number}
                     comments={item.number}
                     id={item.id}
                     nickname={item.nickname}
                     no={item.number}
                  />
               </div>
            ))}
      </div>
   )
}
