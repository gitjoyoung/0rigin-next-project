/* eslint-disable react/self-closing-comp */
import React, { useState } from 'react'
import remarkBreaks from 'remark-breaks'
import MDEditor, { commands } from '@uiw/react-md-editor'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import { validateFile } from '@/utils/boardValidators/imageValidators'
import imageCompression from 'browser-image-compression'
import { uploadImageToFirebase } from '@/app/api/board/create'

interface Props {
   content: string
   setContent: React.Dispatch<React.SetStateAction<string>>
}

export default function App({ content, setContent }: Props) {
   //    setContent(
   //       `# New Line Problem

   // * Some
   // * List
   // * Items

   // I want to render the below 5 new lines without effecting the other elements in this markdown string.

   // [Start of 5 lines]

   // [End of 5 lines]

   // \`\`\`js
   // const helloWorld = () => {
   //   console.log("i also want this code block to work fine")

   // }
   // \`\`\``,
   //    )
   const uploadImageCommand = {
      name: 'upload-image',
      keyCommand: 'upload-image',
      buttonProps: { 'aria-label': 'Upload image' },
      icon: (
         <svg width="12" height="12" viewBox="0 0 16 16">
            <path
               fillRule="evenodd"
               d="M13 2a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h10zM5.5 9.5l2.5-3 3.5 4.5H3l2.5-4zm6-6H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"
            ></path>
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
                  (prevMarkdown) => `${prevMarkdown}![image](${realUrl})\n`,
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
         <MDEditor
            height={500}
            value={content}
            onChange={setContent}
            commands={[
               uploadImageCommand,
               commands.bold,
               commands.unorderedListCommand,
               commands.code,
               commands.hr,
               commands.italic,
               commands.link,
               commands.quote,
               commands.title,
               commands.divider,
               commands.hr,
            ]}
            previewOptions={{
               remarkPlugins: [remarkBreaks],
            }}
         />
      </div>
   )
}
