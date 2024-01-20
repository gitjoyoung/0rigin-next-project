'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import pepe from '@/assets/sadpepe.jpg'; // 이미지 예시
// 추가 이미지 경로들...

export default function Banner() {
   const data = [
      {
         title: '제목',
         body: '내용',
         image: 'abs.jpg',
      },
   ];
   // 배너 슬라이더 고민
   //  const [currentImageIndex, setCurrentImageIndex] = useState(0);

   //  useEffect(() => {
   //     const timer = setInterval(() => {
   //        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
   //     }, 1000); // 1초마다 이미지 변경

   //     return () => clearInterval(timer); // 타이머 정리
   //  }, []);

   return (
      <section className='w-full flex flex-col justify-center border border-black  '>
         <h1>베스트 인기글</h1>
         <div className='relative w-full  h-56 '>
            <Image alt='개구리' src={pepe} layout='fill' objectFit='cover' placeholder='blur' />
            <div className='   absolute bottom-0 w-full   bg-gradient-to-t from-black pt-5 p-4  text-white '>
               <h1 className='text-2xl font-bold line-clamp-2 max-w-prose '>{data.title}</h1>
               <p className=' break-words text-sm line-clamp-2 max-w-prose  '>{data.body}</p>
            </div>
         </div>
      </section>
   );
}
