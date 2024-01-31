import BoardContent from '@/components/Board/BoardContent'
import BoardRead from '@/components/Board/BoardRead'
import { Suspense } from 'react'
import BoardHeader from '@/components/Board/BoardHeader'
import Loading from './loding'

export default function Read({ params }: { params: { id: string } }) {
   const postid = params.id
   /**
    *  1. 게시판에서 페이지에서 글을 클릭하면 borad/read/[id] 로 이동하여
    * 2. 해당 글의 id를 받아서 게시글을 불러온다.
    * 3. board contetnt 서는 현재 클릭한 글의 백그라운드컬러로 표시한다.
    * 4. board read 에서는 현재의 글의 내용을 보여주고 댓글을 달수있게 한다.
    * 
    * 
    */
   return (
      <Suspense fallback={<Loading />}>
         <BoardHeader title={''} />
         <BoardRead postid={postid} />
         <BoardContent page={1} tap={''} />
      </Suspense>
   )
}
