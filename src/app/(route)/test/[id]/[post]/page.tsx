import React from 'react'

export default function page({ params }: { params: { post: string } }) {
   const { post } = params
   return (
      <div>
         <p>post:{post}</p>
      </div>
   )
}
