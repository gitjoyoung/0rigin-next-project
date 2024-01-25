'use client'

import { ChangeEvent, useRef, useState } from 'react'
import Image from 'next/image'

interface ImagePickerProps {
   label: string
   name: string
   onImageSelected: (imageUrl: string) => void // 새로운 prop 추가
}

interface ImageState {
   src: string
   alt: string
   size: string
}
export default function ImagePicker({
   label,
   name,
   onImageSelected,
}: ImagePickerProps) {
   const IMAGES_TYPES = ['image/png', 'image/jpeg']
   const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
   const MAX_FILE_COUNT = 3 // 최대 3개의 이미지
   /** 이미지 데이타 저장 */
   const [pickedImages, setPickedImages] = useState<ImageState[]>([])

   /** 파일 입력 요소 input 버튼을 참조하기 위해 */
   const imageInput = useRef<HTMLInputElement>(null)

   // 업로드 제한 상수

   /** handlePickClick 업로드 버튼을 누르면 파일 업로드 인풋 태그를 참조하는 함수 */
   const handlePickClick = () => {
      imageInput.current.click()
   }

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
   const validTypes = (file, type) => {
      if (!type.includes(file.type)) {
         alert(`${type} 이미지만 업로드해주세요.`)
         return false
      }
      return true
   }
   /** 파일 업로드시 해당 이미지 첫번째를 파일리더로 data화 저장 */
   const handleImageAdd = (event: ChangeEvent<HTMLInputElement>) => {
      const { files } = event.target
      if (!files || files.length === 0) {
         return // 파일이 없으면 함수를 종료
      }

      // 지원되는 파일 타입만 필터링
      const filteredFiles = Array.from(files).filter((file) => {
         if (!validTypes(file, IMAGES_TYPES)) {
            return false // 지원되지 않는 파일 형식일 경우 거름
         }
         return true
      })

      // 파일 정보 변환
      const newImages = filteredFiles.map((file) => ({
         src: URL.createObjectURL(file),
         alt: file.name,
         size: returnFileSize(file.size),
      }))
      newImages.forEach((image) => {
         onImageSelected(image.src)
      })
      // 기존 이미지 배열에 새로운 이미지들을 추가
      setPickedImages((prevImages) => [...prevImages, ...newImages])
   }
   // 삭제 버튼을 누르면 해당 이미지를 배열에서 제거
   const handleImageRemove = (altToRemove: string) => {
      setPickedImages((prevImages) =>
         prevImages.filter((image) => image.alt !== altToRemove),
      )
   }
   return (
      <div className="flex flex-col gap-2">
         <div className="shrink items-center flex border overflow-x-scroll">
            {!pickedImages && <p>선택된 이미지 없음.</p>}
            {pickedImages &&
               pickedImages.map(({ src, alt, size }) => {
                  return (
                     <div
                        key={alt}
                        className=" border p-1  items-center text-center w-[160px] "
                     >
                        <div className=" w-[150px] h-[150px] relative border border-black">
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
                        <p>{size}</p>
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
