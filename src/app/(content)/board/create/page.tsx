import { Metadata } from 'next'
import BoardPostForm from './ui'

export const metadata: Metadata = {
   title: '0rigin 글쓰기',
}
export default async function Create() {
   return <BoardPostForm />
}
