'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import pepe from '@/assets/sadpepe.jpg'; // 이미지 예시
import { useRouter } from 'next/navigation';
// 추가 이미지 경로들...

export default function Banner() {
   const router = useRouter();
   const data = [
      {
         title: '자연 속의 아름다운 풍경',
         body: '자연 속에서의 아름다운 풍경을 즐기며 힐링하세요. 산과 강, 그리고 푸른 하늘 아래에서의 여행을 경험해보세요.',
      },
      {
         title: '맛있는 요리와 음식',
         body: '세계 각국의 다양한 요리와 음식을 즐기며 식욕을 충족하세요. 맛있는 음식으로 미식의 세계로 떠나보세요.',
      },
      {
         title: '예술과 문화의 향연',
         body: '예술과 문화의 다양한 면을 탐험하며 예술 작품과 역사적인 장소를 발견하세요. 예술과 문화의 아름다움에 빠져보세요.',
      },
      {
         title: '도시의 현장',
         body: '도시 생활을 경험하며 현대적인 도시의 매력을 발견하세요. 현대 아키텍처와 번화한 거리로 가득한 도시에서의 모험을 즐기세요.',
      },
      {
         title: '모험과 스포츠',
         body: '모험과 스포츠 활동을 통해 미지의 대자연을 탐험하세요. 하이킹, 서핑, 스노클링 등 다양한 액티비티를 체험해보세요.',
      },
   ];

   const [selectedPost, setSelectedPost] = useState(0);

   useEffect(() => {
      const timer = setInterval(() => {
         setSelectedPost((prevIndex) => (prevIndex + 1) % data.length);
      }, 2000); // 2초마다 인덱스 변경
      return () => clearInterval(timer); // 컴포넌트 언마운트 시 타이머 정리
   }, []);

   return (
      <section className='w-full flex flex-wrap justify-center border border-black   transition-'>
         <div className=' w-full md:w-7/12 '>
            <h1 className='hidden'>베스트 인기글 프리뷰</h1>
            <div className='relative w-full  h-56   '>
               <Image alt='개구리' src={pepe} layout='fill' objectFit='cover' placeholder='blur' />
               <div className='   absolute bottom-0 w-full   bg-gradient-to-t from-black pt-5 p-4  text-white '>
                  <h1 className='text-2xl font-bold line-clamp-2 max-w-prose '>
                     {data[selectedPost].title}
                  </h1>
                  <p className=' break-words text-sm line-clamp-2 max-w-prose  '>
                     {data[selectedPost].body} /
                  </p>
               </div>
            </div>
         </div>

         <div className=' border border-black md:w-5/12 w-full p-1 '>
            <h1 className='font-bold'>베스트 게시글</h1>
            <ul className='m-1 text-sm'>
               {data.map(({ title, body, image }, index) => (
                  <li
                     key={index}
                     className={`border flex justify-between mt-1 p-1 ${
                        selectedPost === index ? 'bg-gray-200 font-bold' : 'text-sm'
                     }`}
                     onClick={() => {
                        setSelectedPost(index); // 클릭 시 상태를 현재 인덱스로 설정
                        router.push('board/read/dae6');
                     }}
                  >
                     <h2 className='  line-clamp-2 max-w-prose '>{title}</h2>
                     <h3 className='  '>추천수</h3>
                  </li>
               ))}
            </ul>
         </div>
      </section>
   );
}
