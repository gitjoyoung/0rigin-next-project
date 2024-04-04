import React from 'react'
import { ROUTES } from '@/constants/route'
import BoardWriteButton from './BoardWriteButton'

export default function BoardFooter() {
   return (
      <div className="my-5 mb-10 flex justify-between items-center">
         <BoardWriteButton route={ROUTES.BOARD} title="목록" />
         <BoardWriteButton route={ROUTES.BOARD_WRITE} title="글쓰기" />
      </div>
   )
}
