'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import { updatePost } from '@/app/api/board/updatePostApi'
import { ROUTES } from '@/constants/route'
import { CreatePostData } from '@/types/boardTypes'
import { updateIncrementCount } from '@/app/api/board/tickerApi'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import sanitize from 'rehype-sanitize'
import stringify from 'rehype-stringify'
import MarkDownEditor from './MarkDownEditor'
import FormSubmitButton from './FormSubmitButton'
import BoardEditorHelpBox from './BoardEditorHelpBox'

interface Props {
   editData?: CreatePostData
}

export default function BoardCreateForm({ editData }: Props) {
   // 라우터 이동
   const router = useRouter()
   // 패스 워드
   const [showPassword, setShowPassword] = useState(false)

   // 글쓰기 폼의 내용을 저장하는 state
   const [content, setContent] = useState('') // 글쓰기 폼의 내용을 저장하는 state

   // 글쓰기 폼 제출
   const handleFormSubmit = async (e) => {
      e.preventDefault()
      const sanitizedContent = await unified()
         .use(remarkParse) // Markdown 문서를 파싱
         .use(remarkRehype) // 파싱된 Markdown을 HTML로 변환
         .use(sanitize) // HTML 살균
         .use(stringify) // HTML을 문자열로 변환
         .process(content) // 사용자 입력 content 처리

      const resultHtml = String(sanitizedContent.value)

      const dataObject: CreatePostData = {
         nickname: e.target.nickname.value,
         password: e.target.password.value,
         title: e.target.title.value,
         content: resultHtml,
      }
      await updatePost(dataObject).then((postNumber) => {
         updateIncrementCount('post')
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
               <div className=" border max-w-[160px]">
                  <input
                     className="w-full p-2"
                     defaultValue={editData?.nickname}
                     autoComplete="current-password"
                     type="text"
                     name="nickname"
                     placeholder="닉네임"
                     minLength={2}
                     maxLength={12}
                     required
                  />
               </div>
               {/* 비밀번호 */}
               <div className=" flex border max-w-[160px]">
                  <input
                     autoComplete="current-password"
                     className="p-2 w-full "
                     type={showPassword ? 'text' : 'password'}
                     name="password"
                     placeholder="비밀번호"
                     minLength={4}
                     maxLength={10}
                     required
                  />
                  <button
                     type="button"
                     onClick={() => setShowPassword(!showPassword)}
                     className=" border-transparent inset-y-0 right-0 p-2 flex items-center"
                  >
                     {showPassword ? (
                        <FontAwesomeIcon icon={faEye} />
                     ) : (
                        <FontAwesomeIcon icon={faEyeSlash} />
                     )}
                  </button>
               </div>
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
               <button
                  type="button"
                  onClick={() => router.back()}
                  className="p-3"
               >
                  취소 하기
               </button>
               <FormSubmitButton label="제출 하기" />
            </div>
         </form>
      </section>
   )
}
