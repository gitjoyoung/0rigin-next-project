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
import { Icons } from '@/shared/ui/icons'
import { compressImage } from '@/shared/utils/compress-image'
import '@uiw/react-markdown-preview/markdown.css'
import { commands } from '@uiw/react-md-editor'
import '@uiw/react-md-editor/markdown-editor.css'
import dayjs from 'dayjs'
import dynamic from 'next/dynamic'
import React from 'react'
import { UseFormRegister, UseFormSetValue } from 'react-hook-form'
import rehypeSanitize from 'rehype-sanitize'
import remarkBreaks from 'remark-breaks'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: true })

// 제목 밑줄 제거를 위한 스타일
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
         icon: <Icons.imageUpload size={16} />,
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
                     <Icons.imageUpload />
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
               rehypePlugins: [[rehypeSanitize]],
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
