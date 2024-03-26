'use client'

import { updateEditPost } from '@/app/api/board/post/updatePostApi'
import InputNickName from '@/components/common/InputIdBox'
import InputPasswordBox from '@/components/common/InputPasswordBox'
import { ROUTES } from '@/constants/route'
import { CreatePostData } from '@/types/boardTypes'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import BoardEditorHelpBox from './BoardEditorHelpBox'
import FormSubmitButton from './FormSubmitButton'
import MarkDownEditor from './MarkDownEditor'

interface Props {
   postId: string
   editData: CreatePostData
}

export default function BoardEditForm({ postId, editData }: Props) {
   const router = useRouter()
   // 패스 워드 버튼 감추기
   // 글쓰기 내용을 저장하는 state
   const [content, setContent] = useState(editData.markdown || '') // 글쓰기 폼의 내용을 저장하는 state

   // 글쓰기 폼 제출
   const handleFormSubmit = async (e) => {
      e.preventDefault()
      const sanitizedContent = await unified()
         .use(remarkParse) // Markdown 문서를 파싱
         .use(remarkRehype) // 파싱된 Markdown을 HTML로 변환
         .use(rehypeSanitize) // HTML 살균
         .use(rehypeStringify) // HTML을 문자열로 변환
         .process(content) // 사용자 입력 content 처리

      const resultHtml = String(sanitizedContent.value)

      const dataObject: CreatePostData = {
         nickname: e.target.nickname.value,
         password: e.target.password.value,
         title: e.target.title.value,
         content: resultHtml,
         markdown: content,
      }
      await updateEditPost(postId, dataObject).then((postNumber) => {
         router.push(`${ROUTES.BOARD}/1/${postNumber}`)
      })
   }
   return (
      <section className=" w-full  px-1 py-2  ">
         <form
            className="w-full flex flex-col gap-2"
            onSubmit={(e) => handleFormSubmit(e)}
         >
            {/* 닉네임 비밀번호 */}
            <div className="flex flex-wrap items-center gap-2 mt-2 mb-2 text-sm ">
               {/* 게시글 작성 닉네임 */}
               <InputNickName
                  defaultValue={editData?.nickname}
                  name="nickname"
                  placeholder="닉네임"
               />
               {/* 비밀번호 */}
               <InputPasswordBox name="password" placeholder="패스워드" />
            </div>
            {/* 제목 */}
            <input
               defaultValue={editData?.title}
               className="border p-2  text-sm "
               type="text"
               name="title"
               placeholder="제목"
               required
            />

            {/* 내용 contentEditTable 로 태그를 추가함 */}
            <BoardEditorHelpBox />
            {/* 글쓰기 마크다운 */}
            <MarkDownEditor content={content} setContent={setContent} />

            {/* 제출 버튼 */}
            <div className="flex gap-6 justify-end p-1 m-3">
               <FormSubmitButton
                  label="취소 하기"
                  onClick={() => router.back()}
               />
               <FormSubmitButton label="제출 하기" />
            </div>
         </form>
      </section>
   )
}
