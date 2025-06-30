'use client'

import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from '@/shared/shadcn/ui/dialog'
import { Button } from '@/shared/shadcn/ui/button'
import { Card, CardContent } from '@/shared/shadcn/ui/card'
import { Icons } from '@/shared/ui/icons'
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'

export default function VideoEditor() {
   const ffmpegRef = useRef<any>(null)
   const [video, setVideo] = useState<File | null>(null)
   const [preview, setPreview] = useState<string | null>(null)
   const [outputUrl, setOutputUrl] = useState<string | null>(null)
   const [format, setFormat] = useState<'mp4' | 'webm'>('mp4')
   const [resolution, setResolution] = useState<'1080' | '720' | '480'>('720')
   const [start, setStart] = useState('0')
   const [end, setEnd] = useState('')
   const [loading, setLoading] = useState(false)

   const load = useCallback(async () => {
      if (!ffmpegRef.current) {
         const ffmpeg = createFFmpeg({ log: true })
         await ffmpeg.load()
         ffmpegRef.current = ffmpeg
      }
   }, [])

   const onDrop = useCallback((accepted: File[]) => {
      const file = accepted[0]
      if (file) {
         setVideo(file)
         setPreview(URL.createObjectURL(file))
      }
   }, [])

   const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: { 'video/*': [] },
      multiple: false,
      maxFiles: 1,
   })

   const process = async () => {
      if (!video) return
      setLoading(true)
      await load()
      const ffmpeg = ffmpegRef.current
      ffmpeg.FS('writeFile', 'input', await fetchFile(video))
      const args = ['-i', 'input', '-ss', start]
      if (end) args.push('-to', end)
      args.push('-vf', `scale=${resolution}:-2`, `output.${format}`)
      await ffmpeg.run(...args)
      const data = ffmpeg.FS('readFile', `output.${format}`)
      const url = URL.createObjectURL(
         new Blob([data.buffer], { type: `video/${format}` }),
      )
      setOutputUrl(url)
      setLoading(false)
   }

   const reset = () => {
      setVideo(null)
      if (preview) URL.revokeObjectURL(preview)
      setPreview(null)
      if (outputUrl) URL.revokeObjectURL(outputUrl)
      setOutputUrl(null)
      setStart('0')
      setEnd('')
   }

   return (
      <div className="w-full max-w-2xl mx-auto p-4">
         <Card>
            <CardContent className="p-6 space-y-4">
               <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300'}`}
               >
                  <input {...getInputProps()} />
                  <div className="h-64 flex items-center justify-center">
                     {preview ? (
                        <video
                           src={preview}
                           controls
                           className="max-h-56 mx-auto rounded-lg"
                        />
                     ) : (
                        <div className="space-y-2">
                           <p className="text-lg font-medium">
                              영상을 여기에 드래그하거나 클릭하여 선택하세요
                           </p>
                           <p className="text-sm text-gray-500" aria-hidden>
                              MP4, WebM 등 영상 파일을 지원합니다
                           </p>
                        </div>
                     )}
                  </div>
               </div>

               {video && (
                  <div className="space-y-2">
                     <div className="flex gap-2">
                        <label className="text-sm flex items-center gap-2">
                           시작 시간
                           <input
                              type="text"
                              value={start}
                              onChange={(e) => setStart(e.target.value)}
                              className="border rounded p-1 w-20"
                           />
                        </label>
                        <label className="text-sm flex items-center gap-2">
                           종료 시간
                           <input
                              type="text"
                              value={end}
                              onChange={(e) => setEnd(e.target.value)}
                              className="border rounded p-1 w-20"
                           />
                        </label>
                        <label className="text-sm flex items-center gap-2">
                           해상도
                           <select
                              value={resolution}
                              onChange={(e) =>
                                 setResolution(e.target.value as any)
                              }
                              className="border rounded p-1"
                           >
                              <option value="1080">1080p</option>
                              <option value="720">720p</option>
                              <option value="480">480p</option>
                           </select>
                        </label>
                        <label className="text-sm flex items-center gap-2">
                           형식
                           <select
                              value={format}
                              onChange={(e) => setFormat(e.target.value as any)}
                              className="border rounded p-1"
                           >
                              <option value="mp4">MP4</option>
                              <option value="webm">WebM</option>
                           </select>
                        </label>
                     </div>
                  </div>
               )}

               <div className="flex gap-4 mt-4 justify-center">
                  <Button onClick={reset} variant="outline" className="w-32">
                     초기화
                  </Button>
                  <Button
                     onClick={process}
                     disabled={!video || loading}
                     className="w-32"
                  >
                     {loading ? '처리 중...' : '변환하기'}
                  </Button>
               </div>
            </CardContent>
         </Card>

         <Dialog
            open={!!outputUrl}
            onOpenChange={(open) => !open && setOutputUrl(null)}
         >
            <DialogContent>
               <DialogHeader>
                  <DialogTitle>동영상 편집 완료</DialogTitle>
                  <DialogDescription>파일을 다운로드하세요.</DialogDescription>
               </DialogHeader>
               <DialogFooter>
                  <Button variant="outline" onClick={() => setOutputUrl(null)}>
                     닫기
                  </Button>
                  <Button asChild disabled={!outputUrl}>
                     <a
                        href={outputUrl ?? '#'}
                        download={`edited.${format}`}
                        className="flex items-center gap-2"
                     >
                        <Icons.video className="h-4 w-4" />
                        다운로드
                     </a>
                  </Button>
               </DialogFooter>
            </DialogContent>
         </Dialog>

         {loading && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
               <div className="flex flex-col items-center gap-4">
                  <Icons.refreshCcw className="h-8 w-8 animate-spin text-white" />
                  <p className="text-white">동영상 처리 중...</p>
               </div>
            </div>
         )}
      </div>
   )
}
