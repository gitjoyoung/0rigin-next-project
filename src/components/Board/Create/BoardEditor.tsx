'use client'

import React, { useState, useEffect, useRef } from 'react'
import ImagePicker from './ImagePicker'
import Image from 'next/image'

interface Content {
   id: string
   type: string
   content: string
}
type ImageState = {
   src: string
   alt: string
   size: string
}

export default function BoardEditor() {
   const [content, setContent] = useState<Content[]>([
      { id: 'content-1', type: 'text', content: '' },
   ])
   const [ImageFiles, setImageFiles] = useState<ImageState[]>([])
   const editRef = useRef<HTMLDivElement>(null)

   useEffect(() => {
      if (editRef.current) {
         // 기존의 이미지들을 클리어
         // 이미지 파일 배열을 순회하며 <img> 태그 생성 및 추가
         ImageFiles.forEach((item) => {
            const img = document.createElement('img')
            img.src = item.src
            img.alt = '이미지 설명'
            img.width = 300
            img.height = 200
            img.style.objectFit = 'contain'
            img.className = 'py-2'

            editRef.current.appendChild(img)
         })
      }
   }, [ImageFiles])

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

      setContent(updatedContent)
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
            className="flex flex-col overflow-y-scroll p-3 min-h-[500px] text-black"
            suppressContentEditableWarning
            contentEditable
            ref={editRef}
         />

         <button type="button" onClick={handleDate} className="p-3">
            임시버튼
         </button>
      </div>
   )
}
