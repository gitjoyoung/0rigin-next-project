import { Metadata } from 'next'
import BoardCreateForm from '../ui/Create/BoardCreateForm'

export const metadata: Metadata = {
   title: '0rigin 글쓰기',
}
export default async function Create() {
   return (
      <>
         <BoardCreateForm />
      </>
   )
}
