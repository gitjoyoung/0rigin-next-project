'use client'

import BoardCreateForm from '@/components/Board/Create/BoardCreateForm'

function Update({ params }: { params: { id: string } }) {
   const postid = params.id

   const data = {
      nickname: '수정',
      title: '수정제목',
      body: '수정내용',
   }
   return (
      <section>
         <BoardCreateForm
            postid={postid}
            nickname={data.nickname}
            title={data.title}
            body={data.body}
         />
      </section>
   )
}

export default Update
