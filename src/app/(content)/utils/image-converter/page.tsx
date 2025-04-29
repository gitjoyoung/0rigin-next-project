import { Icons } from '@/shared/ui/icons'
import type { Metadata } from 'next'
import Link from 'next/link'
import ImageConverter from './ui/image-converter'

export const metadata: Metadata = {
   title: '이미지 변환기',
   description: '이미지 변환기',
}

export default function page() {
   return (
      <section className="flex flex-col gap-4 mb-10">
         <div className="relative flex items-center justify-center py-4">
            <Link
               href="/utils"
               className="absolute left-2 flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
               <Icons.arrowLeft className="w-8 h-8" />
            </Link>
            <div className="flex items-center gap-2">
               <Icons.imageUpload className="w-6 h-6" />
               <h1 className="text-xl font-bold">이미지 변환 툴</h1>
            </div>
         </div>
         <ImageConverter />
      </section>
   )
}
