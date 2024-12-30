'use client'

import CustomDisclosure from '@/components/common/toggle/CustomDisclosure'
import { TIP_CONTENT } from '@/constants/board/markDownTip'
import MarkDownEditor from './MarkDownEditor'
import BoardSubmitGroups from './BoardSubmitGroups'
import BoardFormHeader from './BoardFormHeader'
import { useBoardForm } from '../hooks/useBoardForm'
import { CreatePostData, Post } from '../../_types/boardTypes'

interface Props {
   editData?: Post | null
   submitPost: (formData: CreatePostData) => void
}

export default function BoardForm({ submitPost, editData = null }: Props) {
   const { markdownContent, setMarkdownContent, handleFormSubmit } =
      useBoardForm(editData, submitPost)

   return (
      <section className=" w-full  px-3 py-2">
         <form
            className="w-full flex flex-col gap-2"
            onSubmit={(e) => handleFormSubmit(e)}
         >
            {/* 닉네임 비밀번호 */}
            <BoardFormHeader editData={editData} />
            {/* 내용 contentEditTable 로 태그를 추가함 */}
            <CustomDisclosure
               title="Mark Down 문법"
               text={TIP_CONTENT}
               color="purple"
            />
            {/* 글쓰기 마크다운 */}
            <MarkDownEditor
               markDownContent={markdownContent}
               setMarkDownContent={setMarkdownContent}
            />
            {/* 제출 버튼 */}
            <BoardSubmitGroups />
         </form>
      </section>
   )
}
