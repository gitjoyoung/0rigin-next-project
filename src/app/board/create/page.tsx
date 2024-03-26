import BoardCreateForm from '@/components/Board/Create/BoardCreateForm'
import BoardCreateTitle from '@/components/Board/Create/BoardCreateTitle'
import { Metadata } from 'next'

export const metadata: Metadata = {
   title: '0rigin 글쓰기',
}
function Create() {
   return (
      <>
         <BoardCreateTitle title="글쓰기" />
         <BoardCreateForm />
      </>
   )
}

export default Create
