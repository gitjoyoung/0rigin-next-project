import Link from 'next/link'
import React from 'react'

export default function page() {
   return (
      <div>
         <div className="bg-black h-[100rem]" />

         <div className="flex flex-col gap-3 border">
            <Link href="/test/2" scroll>
               scroll true
            </Link>
            <Link href="/test/2" scroll={false}>
               scroll false
            </Link>
         </div>
      </div>
   )
}
