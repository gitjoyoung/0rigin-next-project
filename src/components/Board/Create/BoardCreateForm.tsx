'use client'

import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/navigation'
import ImagePicker from './ImagePicker'
import dayjs from 'dayjs'
import fetchCreateForm from '@/app/api/board/create'

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
   const [imageFiles, setImageFiles] = useState([])

   const [divs, setDivs] = useState([{ id: `div-0`, content: '' }])
   const divRefs = useRef([]) // 모든 div에 대한 refs를 저장하는 배열

   useEffect(() => {
      if (divRefs.current[divs.length - 1]) {
         divRefs.current[divs.length - 1].focus()
      }
   }, [divs])

   const addDiv = () => {
      const newDivId = `div-${divs.length}`
      setDivs([...divs, { id: newDivId, content: '' }])
      divRefs.current.push(null)
   }

   const deleteDiv = (index) => {
      if (divs.length > 1 && divs[index].content === '') {
         const newDivs = [...divs]
         newDivs.splice(index, 1)
         setDivs(newDivs)
         divRefs.current.splice(index, 1)
      }
   }

   function moveCaretToEnd(element) {
      // element가 contentEditable인지 확인
      if (!element.contentEditable || element.contentEditable === 'false') {
         return
      }

      element.focus() // 우선 element에 포커스를 맞춥니다.
      const range = document.createRange() // 새로운 Range 객체를 생성합니다.
      const selection = window.getSelection() // 현재 선택 영역에 대한 Selection 객체를 가져옵니다.
      range.selectNodeContents(element) // element의 내용을 range의 선택 영역으로 설정합니다.
      range.collapse(false) // 선택 영역의 끝으로 커서를 이동합니다. (false는 끝을 의미)
      selection.removeAllRanges() // 현재 선택된 영역을 모두 제거합니다.
      selection.addRange(range) // 새로운 선택 영역(커서 위치)을 추가합니다.
   }

   // Enter 키 처리
   const handleEnterKey = (e, index) => {
      e.preventDefault()
      if (index === divs.length - 1) {
         addDiv()
      } else {
         divRefs.current[index + 1].focus()
      }
   }

   // Backspace 키 처리
   const handleBackspaceKey = (e, index) => {
      if (divs.length > 1 && index !== 0) {
         const currentContent = divRefs.current[index].innerText.trim()
         if (currentContent === '') {
            e.preventDefault()
            deleteDiv(index)
            setTimeout(() => divRefs.current[index - 1]?.focus(), 0)
         }
      }
   }

   // ArrowUp 키 처리
   const handleArrowUpKey = (e, index) => {
      e.preventDefault()
      if (index > 0) {
         moveCaretToEnd(divRefs.current[index - 1])
      }
   }

   // ArrowDown 키 처리
   const handleArrowDownKey = (e, index) => {
      e.preventDefault()
      if (index < divs.length - 1) {
         moveCaretToEnd(divRefs.current[index + 1])
      }
   }
   const handleKeyPress = (e, index) => {
      // 각 키별로 처리 함수 분리
      switch (e.key) {
         case 'Enter':
            handleEnterKey(e, index)
            break
         case 'Backspace':
            handleBackspaceKey(e, index)
            break
         case 'ArrowUp':
            handleArrowUpKey(e, index)
            break
         case 'ArrowDown':
            handleArrowDownKey(e, index)
            break
         default:
            // 다른 키 이벤트에 대해서는 기본 동작 수행
            break
      }
   }

   /**
    * 글쓰기 폼을 서버로 전송하는 함수
    */
   const fetchCreate = async (e) => {
      e.preventDefault()

      const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss')
      const dataObject = {
         nickname: e.target.nickname.value,
         password: e.target.password.value,
         title: e.target.title.value,
         body: divs,
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
            onSubmit={(e) => fetchCreate(e)}
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
            {/* 이미지 업로드 */}
            <ImagePicker
               name="이미지 업로드"
               imageFiles={imageFiles}
               setImageFiles={setImageFiles}
            />
            {/* 내용 contentEditTable 로 태그를 추가함 */}
            <div className="border flex flex-col gap-1 p-3 pb-10 min-h-[300px]">
               {divs.map((div, index) => (
                  <p
                     key={div.id}
                     contentEditable="true"
                     ref={(el) => {
                        divRefs.current[index] = el
                     }} // 각 div에 대한 ref를 설정
                     onKeyDown={(e) => handleKeyPress(e, index)}
                     className="hover:border-gray-500 w-full  resize-none  overflow-y-auto"
                     suppressContentEditableWarning
                  >
                     {div.content}
                  </p>
               ))}
            </div>
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
