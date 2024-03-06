import BoardContent from '@/components/Board/BoardContent'
import BoardHeader from '@/components/Board/BoardHeader'
import BoardRead from '@/components/Board/Read/BoardRead'
import { fetchPostById, fetchPosts } from '@/app/api/board/fetchPostApi'

export default async function Read({ params }: { params: { id: string } }) {
   const postId = params.id
   const readData = await fetchPostById(postId)
   const postData = await fetchPosts()

   return (
      <>
         <BoardHeader title="왁자지껄" />
         <BoardRead readData={readData} postId={postId} />
         <BoardContent postData={postData} tap="normal" />
      </>
   )
}
