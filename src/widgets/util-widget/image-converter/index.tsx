'use client'

import { ImageUp } from 'lucide-react'
import { UtilHeader } from '../../../shared/ui/util-header'
import { utilList } from '../constance/util-list'
import ImageConverter from './ui/image-converter'

export default function ImageConverterWidget() {
   return (
      <section className="flex flex-col gap-4 mb-10">
         <UtilHeader
            icon={<ImageUp className="w-6 h-6" />}
            name={utilList[0].name}
            description={utilList[0].description}
         />
         <ImageConverter />
      </section>
   )
}
