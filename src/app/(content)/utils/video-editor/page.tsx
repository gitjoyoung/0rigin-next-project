import { Icons } from '@/shared/ui/icons'
import { Metadata } from 'next'
import Link from 'next/link'
import { utilList } from '../ui/util-list'
import VideoEditor from './ui/video-editor'

export const metadata: Metadata = {
   title: '동영상 편집기',
   description: '동영상 길이 조절과 압축을 지원합니다.',
   robots: {
      index: true,
      follow: true,
   },
}

export default function Page() {
   return (
      <section className="flex flex-col gap-4 mb-10">
         <div className="relative flex items-center justify-center py-4">
            <Link
               href="/utils"
               className="absolute left-2 flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
               <Icons.arrowLeft className="w-8 h-8" />
            </Link>
            <div className="flex items-center gap-2 flex-col">
               <div className="flex items-center gap-2">
                  <Icons.video className="w-6 h-6" />
                  <h1 className="text-xl font-bold">{utilList[1].name}</h1>
               </div>
               <p className="text-sm text-muted-foreground">
                  {utilList[1].description}
               </p>
            </div>
         </div>
         <VideoEditor />
      </section>
   )
}
