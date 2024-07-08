import CustomLink from '@/components/common/links/CustomLink'
import { ROUTES } from '@/constants/route'
import { useSearchParams } from 'next/navigation'
import React from 'react'

interface Props {
   postID: string
}

export default function BoardNavButton({ postID }: Props) {
   const searchParams = useSearchParams()
   const search = Number(searchParams.get('search')) || 1

   return (
      <div className="flex justify-between p-1 items-center my-3">
         <CustomLink
         
            href={`${ROUTES.BOARD}/${Number(postID) - 1}?page=${search}`}
         >
            이전 글
         </CustomLink>
         <CustomLink href={`${ROUTES.BOARD}`}>목록</CustomLink>
         <CustomLink
            href={`${ROUTES.BOARD}/${Number(postID) + 1}?page=${search}`}
         >
            다음 글
         </CustomLink>
      </div>
   )
}
