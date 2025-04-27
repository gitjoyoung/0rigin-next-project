'use client'
import { ROUTE_BOARD } from '@/constants/pathname'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

interface Props {
   postID: string
}

export default function BoardNavButton({ postID }: Props) {
   const searchParams = useSearchParams()
   const search = Number(searchParams.get('search')) || 1

   return (
      <div className="flex justify-between p-1 items-center my-3">
         <Link href={`${ROUTE_BOARD}/${Number(postID) - 1}?page=${search}`}>
            이전 글
         </Link>
         <Link href={`${ROUTE_BOARD}`}>목록</Link>
         <Link href={`${ROUTE_BOARD}/${Number(postID) + 1}?page=${search}`}>
            다음 글
         </Link>
      </div>
   )
}
