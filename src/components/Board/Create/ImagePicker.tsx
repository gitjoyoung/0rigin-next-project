'use client'

import IMAGE_PICKER_CONFIG from '@/constants/board/imagePicker'
import {
   validFileSize,
   validateFile,
} from '@/utils/boardValidators/imageValidators'
import imageCompression from 'browser-image-compression'
import Image from 'next/image'
import React, { ChangeEvent, useRef } from 'react'

type ImageState = {
   url: string
   blob?: Blob
}
interface Props {
   setImageFiles?: React.Dispatch<React.SetStateAction<ImageState[]>>
   imageFiles?: ImageState[]
}
/**
 * 이미지를 업로드하고 미리보기를 제공하는 컴포넌트
 * @param setImageFiles : 이미지 파일을 저장하는 state를 변경하는 함수
 * @param imageFiles : 이미지 파일을 저장하는 state
 * @returns
 */
export default function ImagePicker({ imageFiles, setImageFiles }: Props) {
   /** 파일 입력 요소 input 버튼을 참조하기 위해 */
   const imageInput = useRef<HTMLInputElement>(null)

   /** handlePickClick 업로드 버튼을 누르면 파일 업로드 인풋 태그를 참조하는 함수 */
   const handlePickClick = () => {
      imageInput.current.click()
   }

   /**
    * 이미지 파일 업로드 이벤트 핸들러
    * @param event : 이미지 파일 업로드 이벤트
    * @returns
    */
   const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
      const { files } = event.target

      if (!files || files.length === 0) {
         return // 파일 선택 취소시 함수 종료
      }
      // 이미지 파일 개수가 제한을 초과한 경우 함수 종료
      if (files.length > IMAGE_PICKER_CONFIG.MAX_FILE_COUNT) {
         return
      }
      // 이미지 파일을 필터링하여 유효한 파일만 배열에 추가
      const filteredFiles = Array.from(files).filter((file) => {
         return validateFile(file)
      })

      // 미리보기 이미지 압축 옵션
      const options = {
         maxSizeMB: 1,
         maxWidthOrHeight: 1920,
         useWebWorker: true,
      }

      // 압축된 이미지 배열
      const newImages: ImageState[] = await Promise.all(
         filteredFiles.map(async (file) => {
            try {
               const compressedFile: Blob = await imageCompression(
                  file,
                  options,
               )
               return {
                  url: URL.createObjectURL(compressedFile),
                  blob: compressedFile, // 압축된 이미지의 Blob 데이터 포함
               }
            } catch (error) {
               console.log(error)
               return null // 오류 발생시 null 반환
            }
         }),
      ).then((images) => images.filter((image) => image !== null)) // 압축이 완료된 이미지만 필터링

      // 기존 이미지 배열에 새로운 이미지 배열을 추가
      setImageFiles((prevImages: ImageState[]) => [...prevImages, ...newImages])
   }
   /**
    * 이미지 삭제 핸들러
    * @param src : 이미지 URL.createObjectURL
    */
   const handleImageRemove = (url: string) => {
      setImageFiles((prevImages: ImageState[]) =>
         prevImages.filter((image) => image.url !== url),
      )
   }
   return (
      <div className="flex flex-col gap-2">
         <div className="shrink items-center flex  overflow-x-auto">
            {!imageFiles && <p>선택된 이미지 없음.</p>}
            {imageFiles &&
               imageFiles.map(({ url, blob }) => {
                  return (
                     <div
                        key={blob.name}
                        className="border flex p-0.5 flex-col items-center text-center text-sm w-[160px] h-[160px] relative"
                     >
                        <Image src={url} alt={blob.name} fill />
                        <button
                           type="button"
                           onClick={() => handleImageRemove(url)}
                           className="absolute top-0 right-0 bg-opacity-0 outline-none border-none hover:bg-opacity-100 hover:border-opacity-100 bg-black  text-black hover:text-white px-1 font-bold text-center"
                        >
                           X
                        </button>
                        <div className="bg-white w-full absolute bottom-0">
                           <p className="line-clamp-1 break-all">{blob.name}</p>
                           <p className="line-clamp-1 break-all">
                              사이즈: {validFileSize(blob.size)}
                           </p>
                        </div>
                     </div>
                  )
               })}
         </div>
         <div className="border p-1 ">
            <input
               className="hidden"
               type="file"
               id="imageInput"
               accept="image/png, image/jpeg"
               name="imageInput"
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
