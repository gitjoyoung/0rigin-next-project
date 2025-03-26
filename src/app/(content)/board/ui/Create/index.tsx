'use client'

import { Button } from '@/shared/shadcn/ui/button'
import type { CreatePostData, Post } from '@/types/boardTypes'
import { useRouter } from 'next/navigation'
import { useBoardForm } from '../../hooks/useBoardForm'
import BoardAccordion from './BoardAccordion'
import BoardFormHeader from './BoardFormHeader'
import MarkDownEditor from './MarkDownEditor'

interface Props {
   editData?: Post | null
   submitPost: (formData: CreatePostData) => void
}

export default function BoardForm({ submitPost, editData = null }: Props) {
   const router = useRouter()
   const { markdownContent, setMarkdownContent, handleFormSubmit } =
      useBoardForm(editData, submitPost)

   return (
      <section className=" w-full  px-3 py-2">
         <form
            className="w-full flex flex-col gap-2"
            onSubmit={(e) => handleFormSubmit(e)}
         >
            {/* 글쓰기 헤더 닉네임 비밀번호 제목 */}
            <BoardFormHeader editData={editData} />
            {/* 내용 contentEditTable 로 태그를 추가함 */}
            <BoardAccordion />
            {/* 글쓰기 마크다운 */}
            <MarkDownEditor
               markDownContent={markdownContent}
               setMarkDownContent={setMarkdownContent}
            />
            {/* 제출 버튼 */}
            <div className="flex gap-6 justify-end my-2">
               <Button type="button" onClick={() => router.back()}>
                  취소 하기
               </Button>
               <Button type="submit">제출 하기</Button>
            </div>
         </form>
      </section>
   )
}
