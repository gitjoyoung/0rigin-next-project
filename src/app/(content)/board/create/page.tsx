import BoardCreateForm from '../_components/Create/BoardCreateForm'
import { Metadata } from 'next'

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
