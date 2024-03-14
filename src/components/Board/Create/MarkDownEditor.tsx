'use client'

import React, { useCallback } from 'react'
import remarkBreaks from 'remark-breaks'
import {
   generateErrorMessage,
   validateFile,
} from '@/utils/boardValidators/imageValidators'
import imageCompression from 'browser-image-compression'
import rehypeSanitize from 'rehype-sanitize'
import dynamic from 'next/dynamic'
import { ContextStore, commands } from '@uiw/react-md-editor'
import uploadImageToFirebase from '@/app/api/board/imageApi'
import { PhotoIcon } from '@heroicons/react/20/solid'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

type OnChange = (
   value?: string,
   event?: React.ChangeEvent<HTMLTextAreaElement>,
   state?: ContextStore,
) => void

interface Props {
   content: string
   setContent: React.Dispatch<React.SetStateAction<string>>
}

export default function App({ content, setContent }: Props) {
   const onChange = useCallback<OnChange>(
      (val) => {
         setContent(val || '')
      },
      [setContent],
   )

   const uploadImageCommand = {
      name: 'upload-image',
      keyCommand: 'upload-image',
      buttonProps: { 'aria-label': 'Upload image' },
      icon: (
         <svg width="12" height="12" viewBox="0 0 16 16">
            <PhotoIcon />
         </svg>
      ),
      execute: () => {
         const input = document.createElement('input')
         input.type = 'file'
         input.accept = 'image/*'
         input.onchange = async (e) => {
            const file = (e.target as HTMLInputElement).files[0]
            // 파일 선택 취소시 함수 종료
            if (!file || file.size === 0) {
               return
            }
            // 유효하지 않은 파일일 경우 함수 종료
            if (!validateFile(file)) {
               const errorMessage = generateErrorMessage()
               alert(errorMessage)
               return
            }
            const options = {
               maxSizeMB: 1,
               maxWidthOrHeight: 1920,
               useWebWorker: true,
            }
            try {
               const compressedFile = await imageCompression(file, options)
               const realUrl = await await uploadImageToFirebase(compressedFile)
               setContent(
                  (prevMarkdown) => `${prevMarkdown}![image](${realUrl})`,
               )
            } catch (error) {
               alert('이미지 업로드에 실패했습니다.')
            }
         }
         input.click()
      },
   }
   return (
      <div>
         <div className="custom-list ">
            <MDEditor
               height={500}
               value={content}
               onChange={onChange}
               commands={[
                  commands.title,
                  commands.bold,
                  commands.unorderedListCommand,
                  commands.hr,
                  commands.divider,
                  commands.code,
                  commands.quote,
                  commands.divider,
                  uploadImageCommand,
               ]}
               previewOptions={{
                  remarkPlugins: [remarkBreaks],
                  rehypePlugins: [[rehypeSanitize]],
               }}
            />
         </div>
      </div>
   )
}
