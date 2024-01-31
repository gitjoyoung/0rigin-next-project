'use client'

import React, { ChangeEvent, useRef } from 'react'
import Image from 'next/image'

type ImageState = {
   src: string
   alt: string
   size: string
}
interface Props {
   label: string
   name: string
   setImageFiles: React.Dispatch<React.SetStateAction<ImageState[]>>
   imageFiles: ImageState[]
}

export default function ImagePicker({
   label,
   name,
   imageFiles,
   setImageFiles,
}: Props) {
   const IMAGES_TYPES = ['image/png', 'image/jpeg']
   const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
   const MAX_FILE_COUNT = 10 // 최대 3개의 이미지
   /** 이미지 데이타 저장 */

   /** 파일 입력 요소 input 버튼을 참조하기 위해 */
   const imageInput = useRef<HTMLInputElement>(null)

   /** handlePickClick 업로드 버튼을 누르면 파일 업로드 인풋 태그를 참조하는 함수 */
   const handlePickClick = () => {
      imageInput.current.click()
   }
   /**  파일 사이즈를 반환하는 함수 */
   const returnFileSize = (number: number) => {
      if (number < 1024) {
         return `${number.toString()}bytes`
      }
      if (number >= 1024 && number < 1048576) {
         return `${(number / 1024).toFixed(1)}KB`
      }
      if (number >= 1048576) {
         return `${(number / 1048576).toFixed(1)}MB`
      }
   }
   /** 파일 타입을 검사하는 함수  */
   const validFileTypes = (file: File, type: string[]) => {
      if (!type.includes(file.type)) {
         alert(`${type} 이미지만 업로드해주세요.`)
         return false
      }
      return true
   }

   /** 파일 업로드시 로직 */
   const handleImageAdd = (event: ChangeEvent<HTMLInputElement>) => {
      const { files } = event.target
      // 파일 선택 취소시 함수 종료
      if (!files || files.length === 0) {
         return
      }

      // 다중 선택시 지정된 확장자 그림 파일 타입만 필터링
      const filteredFiles = Array.from(files).filter((file) => {
         if (!validFileTypes(file, IMAGES_TYPES)) {
            return false // 지원되지 않는 파일 형식일 경우 거름
         }
         return true
      })

      // filteredFiles 부합한 파일을 배열로 만들어서 이미지 데이타에 추가
      const newImages = filteredFiles.map((file) => ({
         src: URL.createObjectURL(file),
         alt: file.name,
         size: returnFileSize(file.size),
      }))

      // 기존 이미지 배열에 새로운 이미지들을 추가
      setImageFiles((prevImages: ImageState[]) => [...prevImages, ...newImages])
   }

   // 이미지 삭제 누르면 해당 이미지를 배열에서 제거
   const handleImageRemove = (altToRemove: string) => {
      setImageFiles((prevImages: ImageState[]) =>
         prevImages.filter((image) => image.alt !== altToRemove),
      )
      console.log(imageFiles)
   }
   return (
      <div className="flex flex-col gap-2">
         <div className="shrink items-center flex border overflow-x-auto">
            {!imageFiles && <p>선택된 이미지 없음.</p>}
            {imageFiles &&
               imageFiles.map(({ src, alt, size }) => {
                  return (
                     <div
                        key={alt}
                        className="border p-1 items-center text-center w-[160px]"
                     >
                        <div className="w-[150px] h-[150px] relative border border-black">
                           <Image
                              src={src}
                              alt={alt}
                              layout="fill"
                              objectFit="contain"
                           />
                           <button
                              type="button"
                              onClick={() => handleImageRemove(alt)}
                              className="absolute top-0 right-0 z-50 bg-slate-50"
                           >
                              X
                           </button>
                        </div>
                        <p className="line-clamp-1 break-all">{alt}</p>
                        <p>사이즈: {size}</p>
                     </div>
                  )
               })}
         </div>
         <div className="border p-1 ">
            <label htmlFor={name}>{label}</label>
            <input
               className="hidden"
               type="file"
               id={name}
               accept="image/png, image/jpeg"
               name={name}
               ref={imageInput}
               onChange={handleImageAdd}
               multiple
            />
            <button type="button" onClick={handlePickClick}>
               이미지 업로드
            </button>
         </div>
      </div>
   )
}
