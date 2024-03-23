import CustomLink from '@/components/common/CustomLink'
import { ROUTES } from '@/constants/route'
import React from 'react'

interface Props {
   postID: string
   page: number
}

export default function BoardNavButton({ postID, page }: Props) {
   return (
      <div className="flex justify-between p-1 items-center my-3">
         <CustomLink href={`${ROUTES.BOARD}/${page}/${Number(postID) - 1}`}>
            이전 글
         </CustomLink>
         <CustomLink href={`${ROUTES.BOARD}`}>목록</CustomLink>
         <CustomLink href={`${ROUTES.BOARD}/${page}/${Number(postID) + 1}`}>
            다음 글
         </CustomLink>
      </div>
   )
}
