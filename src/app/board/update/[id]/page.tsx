'use client'

import BoardCreateForm from '@/components/Board/BoardCreateForm'

function Update({ params }: { params: { id: string } }) {
   const postid = params.id

   const data = {
      nickname: '수정',
      password: '',
      title: '수정제목',
      body: '수정내용',
   }
   return (
      <section>
         <BoardCreateForm
            nickname={data.nickname}
            password={data.password}
            title={data.title}
            body={data.body}
         />
      </section>
   )
}

export default Update
