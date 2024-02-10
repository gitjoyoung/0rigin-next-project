'use client'

import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/navigation'
import dayjs from 'dayjs'
import fetchCreateForm from '@/app/api/board/create'
import BoardEditor from './BoardEditor'

interface Props {
   nickname?: string
   password?: string
   title?: string
   body?: string
}

export default function BoardCreateForm({
   nickname,
   password,
   title,
   body,
}: Props) {
   const [propsFormData, setPropsFormData] = useState({
      nickname,
      password,
      title,
      body,
   })

   const router = useRouter()
   const [showPassword, setShowPassword] = useState(false)

   // 글쓰기 폼의 내용을 저장하는 state
   const [content, setContent] = useState([
      { id: `div-0`, type: 'text', content: '' },
   ])

   // 글쓰기 폼 제출
   const handleFormSubmit = async (e) => {
      e.preventDefault()

      const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss')
      const dataObject = {
         nickname: e.target.nickname.value,
         password: e.target.password.value,
         title: e.target.title.value,
         body: content,
         timestamp: Number(timestamp), // Convert the timestamp to a number
         isPublic: true,
         category: 'any',
      }

      await fetchCreateForm(dataObject).then((data) =>
         router.push(`/board/read/${data.id}`),
      )
   }

   return (
      <section className=" border  w-full sm:min-w-[900px] p-3  ">
         <h1 className="text-4xl "> 글쓰기 </h1>
         <form
            className="w-full flex flex-col gap-2"
            onSubmit={(e) => handleFormSubmit(e)}
         >
            {/* 아이디 비밀번호 */}
            <div className="flex flex-wrap items-center gap-2 mt-2 mb-2 text-sm ">
               <input
                  defaultValue={propsFormData.nickname}
                  autoComplete="current-password"
                  className="border max-w-[180px] p-2  nh"
                  type="text"
                  name="nickname"
                  placeholder="닉네임"
                  maxLength={8}
               />
               <div className="relative border max-w-[160px]">
                  <input
                     autoComplete="current-password"
                     className="p-2 w-full"
                     type={showPassword ? 'text' : 'password'}
                     name="password"
                     placeholder="비밀번호"
                     maxLength={8}
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
               defaultValue={propsFormData.title}
               className="border p-2  text-sm "
               type="text"
               name="title"
               placeholder="제목"
            />

            {/* 내용 contentEditTable 로 태그를 추가함 */}
            <BoardEditor />

            {/* 제출 버튼 */}
            <div className="flex gap-6 justify-end p-1 mt-3 mb-3">
               <button
                  type="button"
                  onClick={() => router.back()}
                  className="p-3"
               >
                  취소 하기
               </button>
               <button type="submit" className="p-3">
                  제출 하기{' '}
               </button>
            </div>
         </form>
      </section>
   )
}
