'use client'

import React, { useCallback } from 'react'
import remarkBreaks from 'remark-breaks'
import {
   generateErrorMessage,
   validateFile,
} from '@/utils/boardValidators/imageValidators'
import imageCompression from 'browser-image-compression'
import rehypeSanitize from 'rehype-sanitize'
import { ContextStore, commands } from '@uiw/react-md-editor'
import { PhotoIcon } from '@heroicons/react/20/solid'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import uploadImageToFirebase from '@/service/board/imageApi'
import dynamic from 'next/dynamic'
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

type OnChange = (
   value?: string,
   event?: React.ChangeEvent<HTMLTextAreaElement>,
   state?: ContextStore,
) => void

interface Props {
   markDownContent: string
   setMarkDownContent: React.Dispatch<React.SetStateAction<string>>
}

const MarkDownEditor = ({ markDownContent, setMarkDownContent }: Props) => {
   const onChange = useCallback<OnChange>(
      (val) => {
         setMarkDownContent(val || '')
      },
      [setMarkDownContent],
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
               setMarkDownContent(
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
      <div data-color-mode="light" className="markdown-list ">
         <MDEditor
            height={500}
            value={markDownContent}
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
   )
}

export default React.memo(MarkDownEditor)
