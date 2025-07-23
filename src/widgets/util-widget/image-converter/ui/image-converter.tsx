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
import { ImageFileType } from '@/shared/utils/compress-image'
import { ImageUp, RefreshCcw, X } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import useImageConverter from '../hook/use-image-converter'

export default function ImageConverter() {
   const { file, ui, dropzone, actions, utils } = useImageConverter()

   // 모달 상태는 UI 전용이므로 local state로 관리
   const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false)
   const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false)

   // 필요한 값들을 구조분해
   const { image, preview, selectedFormat, conversionInfo, hasFile } = file
   const { isLoading, downloadUrl, error, canConvert, isConverted, hasError } =
      ui
   const { getRootProps, getInputProps, isDragActive } = dropzone
   const { handleConvert, handleReset, setSelectedFormat } = actions
   const { getFileExtension } = utils

   // 에러 상태 변화 감지해서 에러 다이얼로그 열기
   useEffect(() => {
      if (hasError && error) {
         setIsErrorDialogOpen(true)
      }
   }, [hasError, error])

   // 변환 완료되면 다운로드 모달 열기
   useEffect(() => {
      if (isConverted && downloadUrl) {
         setIsDownloadModalOpen(true)
      }
   }, [isConverted, downloadUrl])

   const handleCloseErrorDialog = () => {
      setIsErrorDialogOpen(false)
      actions.handleReset() // 에러 상태도 초기화
   }

   return (
      <div className="w-full max-w-2xl mx-auto">
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
                              width={500}
                              height={300}
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
                           <p className="text-sm text-gray-500">
                              PNG, JPG, JPEG, GIF, WebP 파일만 지원됩니다
                           </p>
                        </div>
                     )}
                  </div>
               </div>

               {hasFile && (
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
                     onClick={() => {
                        void handleConvert()
                     }}
                     disabled={!canConvert || isLoading}
                     className="w-32"
                  >
                     {isLoading ? '변환 중...' : '변환하기'}
                  </Button>
               </div>
            </CardContent>
         </Card>

         {/* 다운로드 모달 */}
         <Dialog
            open={isDownloadModalOpen}
            onOpenChange={setIsDownloadModalOpen}
         >
            <DialogContent>
               <DialogHeader>
                  <DialogTitle>이미지 변환 완료</DialogTitle>
               </DialogHeader>
               <DialogDescription>
                  <div className="text-sm text-muted-foreground space-y-2 py-2">
                     <div className="flex justify-between">
                        <span>변환 전:</span>
                        <span>
                           {conversionInfo?.before.format.toUpperCase()} (
                           {(conversionInfo?.before.size ?? 0 / 1024).toFixed(
                              2,
                           )}{' '}
                           KB)
                        </span>
                     </div>
                     <div className="flex justify-between">
                        <span>변환 후:</span>
                        <span>
                           {conversionInfo?.after?.format.toUpperCase()} (
                           {(conversionInfo?.after?.size ?? 0 / 1024).toFixed(
                              2,
                           )}{' '}
                           KB)
                        </span>
                     </div>
                     <div className="flex justify-between font-semibold">
                        <span>용량 감소:</span>
                        <span>
                           {conversionInfo?.before.size &&
                              conversionInfo?.after?.size &&
                              (
                                 ((conversionInfo.before.size -
                                    conversionInfo.after.size) /
                                    conversionInfo.before.size) *
                                 100
                              ).toFixed(1)}
                           %
                        </span>
                     </div>
                  </div>
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
                        download={`compressed_${image?.name.split('.')[0]}.${getFileExtension(selectedFormat)}`}
                        className="flex items-center gap-2"
                     >
                        <ImageUp className="h-4 w-4" />
                        다운로드
                     </a>
                  </Button>
               </DialogFooter>
            </DialogContent>
         </Dialog>

         {/* 로딩 오버레이 */}
         {isLoading && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
               <div className="flex flex-col items-center gap-4">
                  <RefreshCcw className="h-8 w-8 animate-spin text-white" />
                  <p className="text-white">이미지 변환 중...</p>
               </div>
            </div>
         )}

         {/* 에러 다이얼로그 */}
         <AlertDialog
            open={isErrorDialogOpen}
            onOpenChange={setIsErrorDialogOpen}
         >
            <AlertDialogContent>
               <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2 text-red-600">
                     <X className="h-5 w-5" />
                     오류 발생
                  </AlertDialogTitle>
                  <AlertDialogDescription>{error}</AlertDialogDescription>
               </AlertDialogHeader>
               <AlertDialogFooter>
                  <Button variant="outline" onClick={handleCloseErrorDialog}>
                     확인
                  </Button>
               </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialog>
      </div>
   )
}
