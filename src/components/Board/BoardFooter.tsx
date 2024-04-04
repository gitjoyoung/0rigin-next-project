import React from 'react'
import { ROUTES } from '@/constants/route'
import BoardMainButton from './BoardMainButton'

export default function BoardFooter() {
   return (
      <div className="my-5 mb-10 flex justify-between items-center">
         <BoardMainButton route={ROUTES.BOARD} title="목록" />
         <BoardMainButton route={ROUTES.BOARD_WRITE} title="글쓰기" />
      </div>
   )
}
