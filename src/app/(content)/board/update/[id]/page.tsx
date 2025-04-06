import { Metadata } from 'next'

interface IParams {
   params: {
      id: string
   }
}

export const metadata: Metadata = {
   title: '0rigin 게시물 수정',
   description: '게시물 수정하기.',
}

export default async function Update({ params }: IParams) {
   const postId: string = params.id

   return <></>
}
