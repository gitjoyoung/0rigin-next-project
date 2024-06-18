import React from 'react'

interface Props {
   params: {
      id: string
   }
}
export default function page({ params }: Props) {
   return <div>page</div>
}
