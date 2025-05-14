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

const IMAGE_COMPRESSION_OPTIONS = {
   maxSizeMB: 0.5,
   maxWidthOrHeight: 1200,
   useWebWorker: true,
   initialQuality: 0.8,
}

interface MarkDownEditorProps {
   name: string
   setValue: UseFormSetValue<any>
   register: UseFormRegister<any>
   onImageUpload?: (base64Images: { name: string; data: string }[]) => void
}
const supabase = SupabaseBrowserClient()

const MarkDownEditor = ({
   name,
   setValue,
   register,
   onImageUpload,
}: MarkDownEditorProps) => {
   const [editorValue, setEditorValue] = React.useState<string>('')
   const [tempImages, setTempImages] = React.useState<
      { name: string; data: string }[]
   >([])
   const [error, setError] = React.useState<string | null>(null)
   const fileInputRef = React.useRef<HTMLInputElement>(null)
   const [isOpen, setIsOpen] = React.useState(false)
   React.useEffect(() => {
      register(name)
   }, [register, name])

   React.useEffect(() => {
      if (onImageUpload) {
         onImageUpload(tempImages)
      }
   }, [tempImages, onImageUpload])

   const handleChange = (val?: string) => {
      setEditorValue(val || '')
      setValue(name, val || '')
   }

   const handleImageUpload = async (file: File) => {
      if (!file || file.size === 0) {
         setError('파일이 비어있습니다.')
         setIsOpen(true)
         return
      }

      try {
         const result = await compressImage(file, {
            fileType: 'image/jpeg',
            maxSizeMB: 0.1,
            maxWidthOrHeight: 1920,
         })
         if (result.status === 'error') {
            setError(`이미지 압축에 실패했습니다.  ${result.errorMessage}`)
            setIsOpen(true)
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
            setError(`이미지 업로드 실패: ${error.message}`)
            setIsOpen(true)
            return
         }
         const {
            data: { publicUrl },
         } = supabase.storage.from('images').getPublicUrl(data.path)

         const imageMarkdown = `![${file.name}](${publicUrl})`
         const newValue =
            editorValue + (editorValue ? '\n' : '') + imageMarkdown
         handleChange(newValue)
         setError(null)
         setIsOpen(false)
      } catch (error) {
         setError('이미지 업로드에 실패했습니다. 다시 시도해주세요.')
         setIsOpen(true)
      }
   }

   const uploadImageCommand = {
      name: 'upload-image',
      keyCommand: 'upload-image',
      buttonProps: { 'aria-label': 'Upload image' },
      icon: <Icons.imageUpload size={16} />,
      execute: () => {
         fileInputRef.current?.click()
      },
   }

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
               e.target.value = '' // Reset input
            }}
         />
         {error && (
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
               <AlertDialogContent>
                  <AlertDialogHeader>
                     <AlertDialogTitle className=" flex flex-row items-center gap-2 text-red-600 dark:text-red-400">
                        <Icons.imageUpload />
                        <p>이미지 업로드 오류</p>
                     </AlertDialogTitle>
                     <AlertDialogDescription className="whitespace-pre-line">
                        {error}
                     </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                     <Button variant="outline" onClick={() => setIsOpen(false)}>
                        닫기
                     </Button>
                  </AlertDialogFooter>
               </AlertDialogContent>
            </AlertDialog>
         )}
         <MDEditor
            value={editorValue}
            onChange={handleChange}
            style={{
               backgroundColor: 'transparent',
               color: 'inherit',
            }}
            height={500}
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
