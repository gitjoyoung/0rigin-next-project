import BoardContent from '@/components/Board/BoardContent'
import BoardHeader from '@/components/Board/BoardHeader'

export default function Page({ params }: { params: { slug: string } }) {
   // 해당 페이지를 접속 할때 해당 slug 가 있거나
   const slug = params?.slug?.[0] ?? '1'
   // 숫자가 아니면 1로 설정한다.
   const page = /^\d+$/.test(slug) ? parseInt(slug, 10) : 1

   return (
      <>
         <BoardHeader title="왁자지껄" />
         <BoardContent tap="normal" page={page} />
      </>
   )
}
