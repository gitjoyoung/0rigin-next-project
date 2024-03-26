import React from 'react'

interface Props {
   title: string
}

export default function BoardCreateTitle({ title }: Props) {
   return (
      <div className="px-1  w-full  ">
         <h1 className="font-semibolde text-4xl">{title}</h1>
      </div>
   )
}
