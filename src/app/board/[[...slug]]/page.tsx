import BoardContent from '@/components/Board/BoardContent'
import BoardHeader from '@/components/Board/BoardHeader'
import { Fragment } from 'react'

export default function Page({ params }: { params: { slug: string } }) {
   // 해당 페이지를 접속 할때 해당 slug 가 있으면 해당 slug 를 page 로 설정한다
   const slug = params?.slug?.[0] ?? '1'
   // slug 가 숫자인지 확인하고 숫자라면 해당 숫자로 페이지를 설정한다
   const page = /^\d+$/.test(slug) ? parseInt(slug, 10) : 1

   return (
      <>
         <BoardHeader title="왁자지껄" />
         <BoardContent tap="normal" page={page} />
      </>
   )
}
