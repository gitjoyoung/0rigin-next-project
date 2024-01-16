import Image from 'next/image'
import React from 'react'
import pepe from '@/assets/sadpepe.jpg'
export default function Banner() {
  return (
    <div className='w-full'>
      <Image alt='개구리' src={pepe} height={300} width={300} ></Image>
    </div>
  )
}
