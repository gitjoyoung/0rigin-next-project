'use client'

import IMAGE_PICKER_CONFIG from '@/constants/board/imagePicker'
import Image from 'next/image'
import React, { ChangeEvent, useRef } from 'react'

type ImageState = {
   src: string
   alt: string
   size: string
   base64: string
}
interface Props {
   name: string
   setImageFiles: React.Dispatch<React.SetStateAction<ImageState[]>>
   imageFiles: ImageState[]
}

export default function ImagePicker({
   name,
   imageFiles,
   setImageFiles,
}: Props) {
   /** 이미지 데이타 저장 */

   /** 파일 입력 요소 input 버튼을 참조하기 위해 */
   const imageInput = useRef<HTMLInputElement>(null)

   /** handlePickClick 업로드 버튼을 누르면 파일 업로드 인풋 태그를 참조하는 함수 */
   const handlePickClick = () => {
      imageInput.current.click()
   }
   /**  파일 사이즈를 반환하는 함수 */
   const returnFileSize = (number: number): string => {
      if (number < 1024) {
         return `${number.toString()}bytes`
      }
      if (number >= 1024 && number < 1048576) {
         return `${(number / 1024).toFixed(1)}KB`
      }
      if (number >= 1048576) {
         return `${(number / 1048576).toFixed(1)}MB`
      }
      return '' // Add this line to return a value at the end of the function
   }
   /** 파일 타입을 검사하는 함수  */
   const validFileTypes = (file: File, type: string[]) => {
      const isWithinFileSizeLimit =
         file.size <= IMAGE_PICKER_CONFIG.MAX_FILE_SIZE

      if (!type.includes(file.type) || !isWithinFileSizeLimit) {
         alert(
            `${type} 이미지만 업로드하고, 파일 크기는 ${IMAGE_PICKER_CONFIG.MAX_FILE_SIZE}보다 작아야 합니다.`,
         )
         return false
      }

      return true
   }
   /** 이미지를 base64로 인코딩하는 함수 */
   const encodeImageToBase64 = (file) => {
      return new Promise((resolve, reject) => {
         const reader = new FileReader()
         reader.readAsDataURL(file)
         reader.onload = () => {
            resolve(reader.result)
         }
         reader.onerror = (error) => {
            reject(error)
         }
      })
   }
   /** 파일 업로드시 로직 */
   const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
      const { files } = event.target

      if (!files || files.length === 0) {
         return // 파일 선택 취소시 함수 종료
      }

      const filteredFiles = Array.from(files).filter((file) => {
         const isValidFileType = validFileTypes(
            file,
            IMAGE_PICKER_CONFIG.IMAGES_TYPES,
         )
         return isValidFileType
      })
      // 이미지 파일 개수가 제한을 초과한 경우 함수 종료
      if (filteredFiles.length > IMAGE_PICKER_CONFIG.MAX_FILE_COUNT) {
         return
      }

      /** 서버로 보낼 배열을 만듬 */
      const newImages: ImageState[] = await Promise.all(
         filteredFiles.map(async (file) => ({
            src: URL.createObjectURL(file),
            alt: file.name,
            size: returnFileSize(file.size),
            base64: (await encodeImageToBase64(file)) as string,
         })),
      )

      setImageFiles(newImages) // 기존 이미지 배열에 새로운 이미지들을 추가
   }

   // 이미지 삭제  해당 이미지를 배열에서 제거
   const handleImageRemove = (altToRemove: string) => {
      setImageFiles((prevImages: ImageState[]) =>
         prevImages.filter((image) => image.alt !== altToRemove),
      )
      console.log(imageFiles)
   }
   return (
      <div className="flex flex-col gap-2">
         <div className="shrink items-center flex  overflow-x-auto">
            {!imageFiles && <p>선택된 이미지 없음.</p>}
            {imageFiles &&
               imageFiles.map(({ src, alt, size }) => {
                  return (
                     <div
                        key={alt}
                        className="border flex p-0.5 flex-col items-center text-center text-sm w-[160px]"
                     >
                        <div className="w-[150px] h-[150px] relative ">
                           <Image src={src} alt={alt} fill />
                           <button
                              type="button"
                              onClick={() => handleImageRemove(alt)}
                              className="absolute top-0 right-0 bg-opacity-0 border-opacity-0 hover:bg-opacity-100 hover:border-opacity-100 bg-black  text-black hover:text-white px-1 font-bold text-center"
                           >
                              X
                           </button>
                        </div>
                        <p className="line-clamp-1 break-all">{alt}</p>
                        <p className="line-clamp-1 break-all">사이즈: {size}</p>
                     </div>
                  )
               })}
         </div>
         <div className="border p-1 ">
            <input
               className="hidden"
               type="file"
               id={name}
               accept="image/png, image/jpeg"
               name={name}
               ref={imageInput}
               onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleImageUpload(e)
               }
               multiple
            />
            <div className="flex items-center gap-1 flex-wrap">
               <button type="button" onClick={handlePickClick}>
                  이미지 업로드
               </button>
               <p className="text-sm text-blue-600">
                  {`파일은 각 ${IMAGE_PICKER_CONFIG.MAX_FILE_SIZE_MB}MB 이하이며, 
                  [${IMAGE_PICKER_CONFIG.IMAGES_TYPES.map((type) => type.split('/')[1]).join(', ')}] 파일 확장자를 지원합니다.
               최대 ${IMAGE_PICKER_CONFIG.MAX_FILE_COUNT}개까지 업로드할 수
               있습니다.`}
               </p>{' '}
            </div>
         </div>
      </div>
   )
}
