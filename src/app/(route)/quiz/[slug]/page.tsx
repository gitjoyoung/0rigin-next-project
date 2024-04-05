import Quiz from '@/components/Quiz'
import React from 'react'

export default function page({ params }) {
   const { slug } = params
   console.log(slug)
   return (
      <div>
         <Quiz />
      </div>
   )
}
