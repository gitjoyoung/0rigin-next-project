'use client'

import React, { useState, useEffect, useRef } from 'react'
import ImagePicker from './ImagePicker'
import Image from 'next/image'

interface Content {
   id: string
   type: string
   content: string
}

export default function BoardEditor() {
   // 이미지 배열
   const [ImageFiles, setImageFiles] = useState([])

   // editRef를 생성
   const editRef = useRef<HTMLDivElement>(null)

   // 이미지 배열이 변경될 때마다 useEffect 실행
   useEffect(() => {
      if (editRef.current) {
         const existingImages = editRef.current.querySelectorAll('img')
         existingImages.forEach((img) => img.remove())

         // 새로운 ImageFiles 배열을 순회하며 모든 이미지를 추가합니다.
         ImageFiles.forEach((item) => {
            const img = document.createElement('img')
            img.src = item.url // 이미지 URL
            img.alt = '이미지 설명' // 대체 텍스트
            img.width = 300 // 이미지 너비
            img.height = 200 // 이미지 높이
            img.style.objectFit = 'contain' // 이미지 스타일
            img.className = 'py-2' // CSS 클래스

            // editRef.current에 이미지를 추가합니다.
            editRef.current.appendChild(img)
         })
      }
   }, [ImageFiles])

   // 데이터 출력 예시
   const handleDate = () => {
      const updatedContent = []

      if (editRef.current) {
         const nodes = Array.from(editRef.current.childNodes)
         nodes.forEach((node, index) => {
            if (node.nodeName === 'IMG') {
               // 이미지 노드 처리
               const imageNode = node as HTMLImageElement // Cast the node to HTMLImageElement
               updatedContent.push({
                  id: `content-${index}`,
                  type: 'image',
                  src: imageNode.src,
                  alt: imageNode.alt || '',
               })
            } else {
               // 텍스트를 포함할 수 있는 노드 처리, 공백 포함
               const { textContent } = node // .trim() 호출 제거
               // 공백만 있는 경우도 처리하려면, 이 조건을 제거하거나 수정합니다.
               // if (textContent) 조건을 제거하면, 모든 노드(공백만 있는 노드 포함)가 처리됩니다.
               updatedContent.push({
                  id: `content-${index}`,
                  type: 'text',
                  content: textContent,
               })
            }
         })
      }

      console.log(JSON.stringify(updatedContent))
   }

   return (
      <div className="border">
         <div className="border">
            <ImagePicker
               imageFiles={ImageFiles}
               setImageFiles={setImageFiles}
            />
         </div>
         <div
            className="flex flex-col overflow-y-scroll p-2 min-h-[500px] text-black"
            suppressContentEditableWarning
            contentEditable
            ref={editRef}
         />

         <button type="button" onClick={handleDate} className="p-3">
            출력 버튼
         </button>
      </div>
   )
}
