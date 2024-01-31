'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import ImagePicker from './ImagePicker'
interface Props {
   nickname: string
   password: string
   title: string
   body: string
}

export default function BoardCreateForm(props: Props) {
   const router = useRouter()
   /** 패스워드 UI 상태 */
   const [showPassword, setShowPassword] = useState(false)
   const textBodyRef = useRef(null)
   const [imageFiles, setImageFiles] = useState([])

   /** 폼데이타 update 수정관련 */
   const [formData, setFormData] = useState({
      nickname: '',
      password: '',
      title: '',
      body: '',
   })
   useEffect(() => {
      setFormData({
         ...props,
      })
   }, [])

   useEffect(() => {
      if (textBodyRef.current) {
         let imageHTML = ''
         imageFiles.forEach((image) => {
            imageHTML += `<img contentEditable=false src="${image.src}" alt="${image.alt}" /><br/>`
         })
         textBodyRef.current.innerHTML = imageHTML
      }
   }, [imageFiles])
   // 비밀번호 감추기
   const handleShowPassword = () => {
      console.log(showPassword)
      setShowPassword(!showPassword)
   }
   // 글쓰기 제출 통신
   const fetchCreate = async (e) => {
      const timestamp = new Date().toISOString()
      e.preventDefault()
      const dataObject = {
         nickname: e.target.nickname.value,
         password: e.target.password.value,
         title: e.target.title.value,
         body: textBodyRef.current.innerHTML,
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
         console.log(res.data)
         router.push(`/board/read/${data.id}`)
      } catch (error) {
         console.log('error :', error)
      }
   }
   // 이미지를 보여주기 위해 div에 추가하는 함수

   return (
      <section className=" border  p-2 w-full sm:min-w-[900px]">
         <h1 className="text-4xl"> 글쓰기</h1>
         <form className="w-full" onSubmit={(e) => fetchCreate(e)}>
            {/* 아이디 비밀번호 */}
            <div className="flex flex-wrap items-center gap-2 mt-2 mb-2">
               <input
                  defaultValue={formData.nickname}
                  autoComplete="current-password"
                  className="border max-w-[135px] p-2  nh"
                  type="text"
                  name="nickname"
                  placeholder="닉네임"
               />
               <input
                  autoComplete="current-password"
                  className="border max-w-[135px] p-2 "
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
            {/* 제목, 이미지, 본문 */}
            <div className=" flex flex-col gap-2">
               {/* 제목 */}
               <input
                  defaultValue={formData.title}
                  className="border w-full p-2   "
                  type="text"
                  name="title"
                  placeholder="제목"
               />
               {/* 이미지 업로드 */}
               <ImagePicker
                  name="이미지 업로드"
                  label={undefined}
                  imageFiles={imageFiles}
                  setImageFiles={setImageFiles}
               />
               {/* 글쓰기 내용 */}
               <div
                  contentEditable="true"
                  ref={textBodyRef}
                  defaultValue={formData.body}
                  className="w-full min-h-[375px] py-5 px-4 border"
               />
            </div>
            {/* 제출 버튼 */}
            <div className="flex gap-6 justify-end p-1 mt-3 mb-3">
               <button
                  type="button"
                  onClick={() => console.log(textBodyRef.current.innerHTML)}
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
