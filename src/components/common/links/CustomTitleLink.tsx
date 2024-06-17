import Link from 'next/link'
import React from 'react'

interface Props {
   title: string
   subTitle?: string
   link: string
   children?: React.ReactNode
}

export default function CustomTitle({
   title,
   subTitle,
   link,
   children,
}: Props) {
   return (
      <div
         className="my-2 flex justify-between 
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
