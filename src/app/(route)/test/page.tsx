import Test from '@/components/Test/Test'
import React from 'react'

export default function page({
   searchParams,
}: {
   searchParams?: {
      query?: string
      page?: string
      name?: string
   }
}) {
   const param = searchParams?.query || ''
   const currentPage = Number(searchParams?.page) || 1
   const currentName = searchParams?.name || ''

   return (
      <div>
         <p>param :{param}</p>
         <p>currentPage : {currentPage}</p>
         <p>currentName : {currentName}</p>
         <Test />
      </div>
   )
}
