import { Icons } from '@/shared/ui/icons'
import { Metadata } from 'next'
import Link from 'next/link'
import { utilList } from '../ui/util-list'
import ImageConverter from './ui/image-converter'

export const metadata: Metadata = {
   title: '이미지 압축 도구',
   description:
      '0RIGIN(제로리진) 이미지 형식을 변환하고 압축할 수 있는 도구입니다.',
   robots: {
      index: true,
      follow: true,
   },
}

export default function Page() {
   return (
      <section className="flex flex-col gap-4 mb-10">
         <div className=" flex items-center justify-center py-4">
            <div className="flex items-center gap-2 flex-col relative">
               <Link
                  href="/utils"
                  className="absolute left-2 flex items-center gap-2 hover:opacity-80 transition-opacity"
               >
                  <Icons.arrowLeft className="w-8 h-8" />
               </Link>
               <div className="flex items-center gap-2 ">
                  <Icons.imageUpload className="w-6 h-6" />
                  <h1 className="text-xl font-bold">{utilList[0].name}</h1>
               </div>
               <p className="text-sm text-muted-foreground">
                  {utilList[0].description}
               </p>
            </div>
         </div>
         <ImageConverter />
      </section>
   )
}
