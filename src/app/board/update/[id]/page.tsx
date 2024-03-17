import { fetchPostById } from '@/app/api/board/fetchPostApi'
import BoardCreateForm from '@/components/Board/Create/BoardCreateForm'
import { CreatePostData, Post } from '@/types/boardTypes'
import { Metadata } from 'next'

export const metadata: Metadata = {
   title: '0rigin 게시물 수정',
}

export default async function Update({ params }: { params: { id: string } }) {
   const postid: string = params.id
   console.log('postid:', postid)
   const { nickname, title, content }: Post = await fetchPostById(postid)
   const editData: CreatePostData = { nickname, title, content }
   // 임시

   return <BoardCreateForm editData={editData} />
}
