'use client'

import {
   AlertDialog,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
} from '@/shared/shadcn/ui/alert-dialog'
import { Button } from '@/shared/shadcn/ui/button'
import { Card, CardContent } from '@/shared/shadcn/ui/card'
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from '@/shared/shadcn/ui/dialog'
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/shared/shadcn/ui/select'
import { Icons } from '@/shared/ui/icons'
import { compressImage, ImageFileType } from '@/shared/utils/compress-image'
import Image from 'next/image'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

export default function ImageConverter() {
   const [image, setImage] = useState<File | null>(null)
   const [preview, setPreview] = useState<string | null>(null)
   const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false)
   const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
   const [isLoading, setIsLoading] = useState(false)
   const [selectedFormat, setSelectedFormat] =
      useState<ImageFileType>('image/png')
   const [conversionInfo, setConversionInfo] = useState<{
      before: { size: number; format: string }
      after: { size: number; format: string } | null
   } | null>(null)
   const [error, setError] = useState<string | null>(null)
   const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false)

   const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
      if (rejectedFiles.length > 0) {
         setError('이미지 파일만 업로드 가능합니다.')
         setIsErrorDialogOpen(true)
         return
      }

      const file = acceptedFiles[0]
      if (file) {
         if (!file.type.startsWith('image/')) {
            setError('이미지 파일만 업로드 가능합니다.')
            setIsErrorDialogOpen(true)
            return
         }

         if (file.size > 10 * 1024 * 1024) {
            setError('파일 크기는 10MB를 초과할 수 없습니다.')
            setIsErrorDialogOpen(true)
            return
         }

         setImage(file)
         const reader = new FileReader()
         reader.onload = () => {
            setPreview(reader.result as string)
         }
         reader.readAsDataURL(file)
         setConversionInfo({
            before: {
               size: file.size,
               format: file.type,
            },
            after: null,
         })
      }
   }, [])

   const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: {
         'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
      },
      maxFiles: 1,
      noClick: false,
      noKeyboard: false,
      multiple: false,
   })

   const handleConvert = async () => {
      if (image) {
         setIsLoading(true)
         const result = await compressImage(image, {
            fileType: selectedFormat,
            maxSizeMB: 0.1,
            maxWidthOrHeight: 1920,
         })
         await new Promise((resolve) => setTimeout(resolve, 300))

         if (result.status === 'success') {
            const url = URL.createObjectURL(result.file)
            setDownloadUrl(url)
            setConversionInfo((prev) => ({
               ...prev!,
               after: {
                  size: result.file.size,
                  format: selectedFormat,
               },
            }))
            setIsDownloadModalOpen(true)
         } else {
            console.error('이미지 압축 실패:', result.errorMessage)
         }
         setIsLoading(false)
      }
   }

   const handleReset = () => {
      setImage(null)
      setPreview(null)
      setConversionInfo(null)
      if (downloadUrl) {
         URL.revokeObjectURL(downloadUrl)
         setDownloadUrl(null)
      }
   }

   return (
      <div className="w-full max-w-2xl mx-auto p-4">
         <Card>
            <CardContent className="p-6">
               <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                     isDragActive
                        ? 'border-primary bg-primary/10'
                        : 'border-gray-300'
                  }`}
               >
                  <input {...getInputProps()} />
                  <div className="h-64 flex items-center justify-center">
                     {preview ? (
                        <div className="space-y-4 w-full">
                           <Image
                              src={preview}
                              alt="미리보기"
                              className="max-h-56 mx-auto rounded-lg object-contain"
                           />
                           <p className="text-sm text-gray-500">
                              이미지를 드래그하거나 클릭하여 변경
                           </p>
                        </div>
                     ) : (
                        <div className="space-y-2">
                           <p className="text-lg font-medium">
                              이미지를 여기에 드래그하거나 클릭하여 선택하세요
                           </p>
                           <p className="text-sm text-gray-500" aria-hidden>
                              PNG, JPG, JPEG, GIF, WebP 파일만 지원됩니다
                           </p>
                        </div>
                     )}
                  </div>
               </div>

               {image && (
                  <div className="mt-4 space-y-2">
                     <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">변환 형식:</p>
                        <Select
                           value={selectedFormat}
                           onValueChange={(value: ImageFileType) =>
                              setSelectedFormat(value)
                           }
                        >
                           <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="변환 형식 선택" />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="image/png">PNG</SelectItem>
                              <SelectItem value="image/jpg">JPG</SelectItem>
                              <SelectItem value="image/jpeg">JPEG</SelectItem>
                              <SelectItem value="image/webp">WEBP</SelectItem>
                              <SelectItem value="image/gif">GIF</SelectItem>
                           </SelectContent>
                        </Select>
                     </div>
                     {conversionInfo && (
                        <div className="text-sm space-y-1">
                           <p>
                              변환 전:{' '}
                              {conversionInfo.before.format.toUpperCase()} (
                              {(conversionInfo.before.size / 1024).toFixed(2)}{' '}
                              KB)
                           </p>
                           {conversionInfo.after && (
                              <p>
                                 변환 후:{' '}
                                 {conversionInfo.after.format.toUpperCase()} (
                                 {(conversionInfo.after.size / 1024).toFixed(2)}{' '}
                                 KB)
                              </p>
                           )}
                        </div>
                     )}
                  </div>
               )}

               <div className="flex gap-4 mt-6 justify-center">
                  <Button
                     onClick={handleReset}
                     variant="outline"
                     className="w-32"
                  >
                     초기화
                  </Button>
                  <Button
                     onClick={handleConvert}
                     disabled={!image || isLoading}
                     className="w-32"
                  >
                     {isLoading ? '변환 중...' : '변환하기'}
                  </Button>
               </div>
            </CardContent>
         </Card>

         <Dialog
            open={isDownloadModalOpen}
            onOpenChange={setIsDownloadModalOpen}
         >
            <DialogContent>
               <DialogHeader>
                  <DialogTitle>이미지 변환 완료</DialogTitle>
               </DialogHeader>
               <DialogDescription>
                  <span className="text-sm text-muted-foreground space-y-2 py-2">
                     <span className="flex justify-between">
                        <span>변환 전:</span>
                        <span>
                           {conversionInfo?.before.format.toUpperCase()} (
                           {(conversionInfo?.before.size / 1024).toFixed(2)} KB)
                        </span>
                     </span>
                     <span className="flex justify-between">
                        <span>변환 후:</span>
                        <span>
                           {conversionInfo?.after?.format.toUpperCase()} (
                           {(conversionInfo?.after?.size / 1024).toFixed(2)} KB)
                        </span>
                     </span>
                     <span className="flex justify-between font-semibold">
                        <span>용량 감소:</span>
                        <span>
                           {(
                              ((conversionInfo?.before.size -
                                 conversionInfo?.after?.size!) /
                                 conversionInfo?.before.size) *
                              100
                           ).toFixed(1)}
                           %
                        </span>
                     </span>
                  </span>
               </DialogDescription>
               <DialogFooter>
                  <Button
                     variant="outline"
                     onClick={() => setIsDownloadModalOpen(false)}
                  >
                     닫기
                  </Button>
                  <Button asChild disabled={!downloadUrl}>
                     <a
                        href={downloadUrl || '#'}
                        download={`compressed_${image?.name.split('.')[0]}.${selectedFormat}`}
                        className="flex items-center gap-2"
                     >
                        <Icons.imageUpload className="h-4 w-4" />
                        다운로드
                     </a>
                  </Button>
               </DialogFooter>
            </DialogContent>
         </Dialog>

         {isLoading && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
               <div className="flex flex-col items-center gap-4">
                  <Icons.refreshCcw className="h-8 w-8 animate-spin text-white" />
                  <p className="text-white">이미지 변환 중...</p>
               </div>
            </div>
         )}

         <AlertDialog
            open={isErrorDialogOpen}
            onOpenChange={setIsErrorDialogOpen}
         >
            <AlertDialogContent>
               <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2 text-red-600">
                     <Icons.x className="h-5 w-5" />
                     오류 발생
                  </AlertDialogTitle>
                  <AlertDialogDescription>{error}</AlertDialogDescription>
               </AlertDialogHeader>
               <AlertDialogFooter>
                  <Button
                     variant="outline"
                     onClick={() => setIsErrorDialogOpen(false)}
                  >
                     확인
                  </Button>
               </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialog>
      </div>
   )
}
