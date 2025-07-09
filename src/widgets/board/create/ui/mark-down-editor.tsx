'use client'

import { SupabaseBrowserClient } from '@/shared/lib/supabase/supabase-browser-client'
import {
   AlertDialog,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
} from '@/shared/shadcn/ui/alert-dialog'
import { Button } from '@/shared/shadcn/ui/button'
import { compressImage } from '@/shared/utils/compress-image'
import '@uiw/react-markdown-preview/markdown.css'
import { commands } from '@uiw/react-md-editor'
import '@uiw/react-md-editor/markdown-editor.css'
import dayjs from 'dayjs'
import { ImageUp } from 'lucide-react'
import dynamic from 'next/dynamic'
import React from 'react'
import { UseFormRegister, UseFormSetValue } from 'react-hook-form'
import rehypeHighlight from 'rehype-highlight'
import rehypeSanitize from 'rehype-sanitize'
import remarkBreaks from 'remark-breaks'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: true })

// 제목 밑줄 제거 및 코드 스타일링을 위한 CSS
const customStyles = `
  .w-md-editor-preview h1,
  .w-md-editor-preview h2,
  .w-md-editor-preview h3,
  .w-md-editor-preview h4,
  .w-md-editor-preview h5,
  .w-md-editor-preview h6 {
    border-bottom: none !important;
    padding-bottom: 0 !important;
  }

  /* 코드 블록 스타일링 */
  .w-md-editor-preview pre {
    background-color: #f6f8fa !important;
    border: 1px solid #e1e4e8 !important;
    border-radius: 6px !important;
    padding: 16px !important;
    overflow: auto !important;
  }

  .w-md-editor-preview code {
    background-color: #f6f8fa !important;
    color: #24292e !important;
    padding: 2px 4px !important;
    border-radius: 3px !important;
    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace !important;
  }

  .w-md-editor-preview pre code {
    background-color: transparent !important;
    padding: 0 !important;
    color: inherit !important;
  }

  /* 다크 모드 코드 스타일링 */
  .dark .w-md-editor-preview pre {
    background-color: #161b22 !important;
    border-color: #30363d !important;
  }

  .dark .w-md-editor-preview code {
    background-color: #161b22 !important;
    color: #e6edf3 !important;
  }

  .dark .w-md-editor-preview pre code {
    background-color: transparent !important;
    color: inherit !important;
  }

  /* 하이라이트된 코드 토큰 스타일 */
  .hljs-keyword { color: #d73a49; }
  .hljs-string { color: #032f62; }
  .hljs-comment { color: #6a737d; }
  .hljs-number { color: #005cc5; }
  .hljs-function { color: #6f42c1; }
  .hljs-variable { color: #e36209; }

  /* 다크 모드 하이라이트 토큰 */
  .dark .hljs-keyword { color: #ff7b72; }
  .dark .hljs-string { color: #a5d6ff; }
  .dark .hljs-comment { color: #8b949e; }
  .dark .hljs-number { color: #79c0ff; }
  .dark .hljs-function { color: #d2a8ff; }
  .dark .hljs-variable { color: #ffa657; }
`

interface MarkDownEditorProps {
   name: string
   setValue: UseFormSetValue<any>
   register: UseFormRegister<any>
   initialValue?: string
}

const supabase = SupabaseBrowserClient()

const MarkDownEditor = ({
   name,
   setValue,
   register,
   initialValue = '',
}: MarkDownEditorProps) => {
   const [value, setValue_] = React.useState<string>(initialValue)
   const [error, setError] = React.useState<string>('')
   const [showErrorDialog, setShowErrorDialog] = React.useState(false)
   const fileInputRef = React.useRef<HTMLInputElement>(null)

   // 폼 필드 등록 및 초기값 설정
   React.useEffect(() => {
      register(name)
      if (initialValue) {
         setValue_(initialValue)
         setValue(name, initialValue)
      }
   }, [register, name, setValue, initialValue])

   const handleChange = React.useCallback(
      (val?: string) => {
         const newValue = val || ''
         setValue_(newValue)
         setValue(name, newValue)
      },
      [name, setValue],
   )

   const showError = React.useCallback((message: string) => {
      setError(message)
      setShowErrorDialog(true)
   }, [])

   const handleImageUpload = React.useCallback(
      async (file: File) => {
         if (!file || file.size === 0) {
            showError('파일이 비어있습니다.')
            return
         }

         try {
            const result = await compressImage(file, {
               fileType: 'image/jpeg',
               maxSizeMB: 0.1,
               maxWidthOrHeight: 1920,
            })

            if (result.status === 'error') {
               showError(`이미지 압축에 실패했습니다. ${result.errorMessage}`)
               return
            }

            const timestamp = dayjs().format('YYYYMMDDHHmmss')
            const fileExtension = file.name.split('.').pop()?.toLowerCase()
            const newFileName = `public/image_${timestamp}.${fileExtension}`

            const { data, error } = await supabase.storage
               .from('images')
               .upload(newFileName, result.file, {
                  cacheControl: '3600',
                  upsert: false,
                  contentType: result.file.type,
               })

            if (error) {
               showError(`이미지 업로드 실패: ${error.message}`)
               return
            }

            const {
               data: { publicUrl },
            } = supabase.storage.from('images').getPublicUrl(data.path)

            const imageMarkdown = `![${file.name}](${publicUrl})`
            const newValue = value + (value ? '\n' : '') + imageMarkdown
            handleChange(newValue)
         } catch (error) {
            showError('이미지 업로드에 실패했습니다. 다시 시도해주세요.')
         }
      },
      [value, handleChange, showError],
   )

   const uploadImageCommand = React.useMemo(
      () => ({
         name: 'upload-image',
         keyCommand: 'upload-image',
         buttonProps: { 'aria-label': 'Upload image' },
         icon: <ImageUp size={16} />,
         execute: () => fileInputRef.current?.click(),
      }),
      [],
   )

   const editorCommands = React.useMemo(
      () => [
         commands.title,
         commands.bold,
         commands.unorderedListCommand,
         commands.hr,
         commands.divider,
         commands.code,
         commands.quote,
         commands.divider,
         uploadImageCommand,
      ],
      [uploadImageCommand],
   )

   return (
      <>
         <style>{customStyles}</style>

         <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={(e) => {
               const file = e.target.files?.[0]
               if (file) {
                  handleImageUpload(file)
               }
               e.target.value = ''
            }}
         />

         <AlertDialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
            <AlertDialogContent>
               <AlertDialogHeader>
                  <AlertDialogTitle className="flex flex-row items-center gap-2 text-red-600 dark:text-red-400">
                     <ImageUp />
                     <p>이미지 업로드 오류</p>
                  </AlertDialogTitle>
                  <AlertDialogDescription className="whitespace-pre-line">
                     {error}
                  </AlertDialogDescription>
               </AlertDialogHeader>
               <AlertDialogFooter>
                  <Button
                     variant="outline"
                     onClick={() => setShowErrorDialog(false)}
                  >
                     닫기
                  </Button>
               </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialog>

         <MDEditor
            value={value}
            onChange={handleChange}
            style={{
               backgroundColor: 'transparent',
               color: 'inherit',
            }}
            height={500}
            commands={editorCommands}
            previewOptions={{
               remarkPlugins: [remarkBreaks],
               rehypePlugins: [[rehypeSanitize], [rehypeHighlight]],
               style: {
                  backgroundColor: 'transparent',
                  color: 'inherit',
                  fontSize: '14px',
               },
            }}
            className="markdown-preview"
         />
      </>
   )
}

export default React.memo(MarkDownEditor)
