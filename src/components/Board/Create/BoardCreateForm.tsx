'use client'

import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/navigation'
import ImagePicker from './ImagePicker'
import dayjs from 'dayjs'

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
   const editorRef = useRef(null)
   const [imageFiles, setImageFiles] = useState([])
   const [text, setText] = useState('')

   const handleShowPassword = () => {
      setShowPassword(!showPassword)
   }

   const fetchCreate = async (e) => {
      e.preventDefault()

      const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss')
      const dataObject = {
         nickname: e.target.nickname.value,
         password: e.target.password.value,
         title: e.target.title.value,
         body: editorRef.current.innerHTML,
         imageFiles,
         timestamp,
         isPublic: true,
         category: 'any',
      }

      const options = {
         url: `${process.env.NEXT_PUBLIC_API_URL}board`,
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         data: JSON.stringify(dataObject),
      }

      try {
         const res = await axios(options)
         const { data } = res
         router.push(`/board/read/${data.id}`)
      } catch (error) {
         console.log('error :', error)
      }
   }

   return (
      <section className=" border  w-full sm:min-w-[900px] p-3  ">
         <h1 className="text-4xl "> 글쓰기 </h1>
         <form
            className="w-full flex flex-col gap-2"
            onSubmit={(e) => fetchCreate(e)}
         >
            {/* 아이디 비밀번호 */}
            <div className="flex flex-wrap items-center gap-2 mt-2 mb-2 text-sm ">
               <input
                  defaultValue={propsFormData.nickname}
                  autoComplete="current-password"
                  className="border max-w-[200px] p-2  nh"
                  type="text"
                  name="nickname"
                  placeholder="닉네임"
               />
               <input
                  autoComplete="current-password"
                  className="border max-w-[200px] p-2 "
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="비밀번호"
               />
               <button key="button" type="button" onClick={handleShowPassword}>
                  {showPassword ? (
                     <FontAwesomeIcon icon={faEye} />
                  ) : (
                     <FontAwesomeIcon icon={faEyeSlash} />
                  )}
               </button>
            </div>
            {/* 제목 */}
            <input
               defaultValue={propsFormData.title}
               className="border p-2  text-sm "
               type="text"
               name="title"
               placeholder="제목"
            />
            {/* 이미지 업로드 */}
            <ImagePicker
               name="이미지 업로드"
               imageFiles={imageFiles}
               setImageFiles={setImageFiles}
            />
            {/* 내용 contentEditTable 로 태그를 추가함 */}
            <div
               ref={editorRef}
               contentEditable="true"
               className="w-full min-h-[375px] py-5 pb-10 px-4 border"
            />

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
