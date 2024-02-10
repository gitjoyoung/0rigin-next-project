import Search from '@/components/Search/Search'
import React from 'react'

export default function page({ params }: { params: { slug: string } }) {
   const { slug } = params
   const decodeSlug = decodeURIComponent(slug)

   // Perform search logic here and store the results in a variable

   return (
      <div>
         <h1 className="p-2 ">
            검색어 : <strong className="font-bold">{decodeSlug}</strong>
         </h1>
         <Search decodeSlug={decodeSlug} />
      </div>
   )
}
