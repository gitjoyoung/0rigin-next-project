import Link from 'next/link'
import React from 'react'

interface Props {
   children?: React.ReactNode
   title: string
   subTitle: string
   link: string
}

export default function CustomTitle({
   children,
   title,
   subTitle,
   link,
}: Props) {
   return (
      <div
         className="my-2 flex  justify-between relative
items-center  px-1 border-b py-2 border-black"
      >
         <div className="flex-col flex gap-1">
            <Link href={link} className="text-3xl font-bold">
               {title}
            </Link>
            <p className="text-sm">{subTitle}</p>
         </div>
         {children}
      </div>
   )
}
