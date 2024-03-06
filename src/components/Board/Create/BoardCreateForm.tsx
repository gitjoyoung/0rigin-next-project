'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import { updatePost } from '@/app/api/board/updatePostApi'
import MarkDownEditor from './MarkDownEditor'
import FormSubmitButton from './FormSubmitButton'
import BoardEditorHelpBox from './BoardEditorHelpBox'

interface Props {
   postid?: string
   nickname?: string
   title?: string
   body?: string
}

export default function BoardCreateForm({
   postid,
   nickname,
   title,
   body,
}: Props) {
   // 라우터 이동
   const router = useRouter()
   // 패스 워드
   const [showPassword, setShowPassword] = useState(false)

   // 글쓰기 폼의 내용을 저장하는 state
   const [content, setContent] = useState(body || '') // 글쓰기 폼의 내용을 저장하는 state

   // 글쓰기 폼 제출
   const handleFormSubmit = async (e) => {
      e.preventDefault()
      const dataObject = {
         nickname: e.target.nickname.value,
         password: e.target.password.value,
         title: e.target.title.value,
         content,
         category: 'any',
      }

      await updatePost(dataObject).then((postNumber) =>
         router.push(`/board/read/${postNumber}`),
      )
   }

   return (
      <section className=" border  w-full sm:min-w-[900px]   sm:px-10 px-1 py-2  ">
         <h1 className="text-4xl my-3 "> 글쓰기 </h1>
         <form
            className="w-full flex flex-col gap-2"
            onSubmit={(e) => handleFormSubmit(e)}
         >
            {/* 아이디 비밀번호 */}
            <div className="flex flex-wrap items-center gap-2 mt-2 mb-2 text-sm ">
               <input
                  defaultValue={nickname}
                  autoComplete="current-password"
                  className="border max-w-[180px] p-2  nh"
                  type="text"
                  name="nickname"
                  placeholder="닉네임"
                  maxLength={8}
                  required
               />
               <div className="relative border max-w-[160px]">
                  <input
                     autoComplete="current-password"
                     className="p-2 w-full"
                     type={showPassword ? 'text' : 'password'}
                     name="password"
                     placeholder="비밀번호"
                     maxLength={8}
                     required
                  />
                  <button
                     type="button"
                     onClick={() => setShowPassword(!showPassword)}
                     className="absolute border-transparent inset-y-0 right-0 p-2 flex items-center"
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
               defaultValue={title}
               className="border p-2  text-sm "
               type="text"
               name="title"
               placeholder="제목"
               required
            />

            {/* 내용 contentEditTable 로 태그를 추가함 */}
            {/* <BoardEditor /> */}
            <BoardEditorHelpBox />

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
