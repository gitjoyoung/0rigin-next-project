import Link from 'next/link';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';

export default function BoardList(props) {
   const { title, timestamp, views, like, comments, id, nickname, no } = props;
   const formattedDate = timestamp ? formatDate(timestamp) : '12:42';

   const formatNumberWithUnit = (number) => {
      if (number === undefined || isNaN(number)) {
         return '0';
      }

      let unit = '';
      let divisor = 1;

      if (number >= 100000000) {
         // 억 단위
         unit = '억';
         divisor = 100000000;
      } else if (number >= 10000) {
         // 만 단위
         unit = '만';
         divisor = 10000;
      }

      const dividedNumber = number / divisor;
      return dividedNumber % 1 === 0
         ? `${Math.floor(dividedNumber)}${unit}` // 소수점 이하가 없으면 정수로 반환
         : `${dividedNumber.toFixed(1)}${unit}`; // 소수점 이하가 있으면 한 자리까지 표시
   };

   function formatDate(timestamp) {
      const now = dayjs();
      const postDate = dayjs(timestamp);
      if (now.format('YYYY.MM.DD') === postDate.format('YYYY.MM.DD')) {
         return postDate.format('HH:mm');
      }
      return postDate.format('YY.MM.DD');
   }

   return (
      <section className='flex items-center  flex-wrap p-2  '>
         <div className='flex-auto gap-2 justify-start flex items-center w-72'>
            <p className='border text-sm mx-1 px-0.5 self-center'>{no || 1113}</p>
            <Link href={`/board/read/${id}`}>
               <h1 className='line-clamp-1 '>{title}</h1>
            </Link>
            <p className='text-gray-400 text-sm mx-1'>[{comments || 100}]</p>
            {/* 조회수 , 추천수가 많은 경우  아이콘 보이기  */}
            {/* <FontAwesomeIcon icon={faStar} /> */}
         </div>
         <ul className=' flex gap-2 text-xs text-gray-400  '>
            <li className='font-bold'>{nickname || '닉네임'}</li>
            <li className='w-18'> {formattedDate} </li>
            <li className='w-18'>추천 {formatNumberWithUnit(like)}</li>
            <li className='w-18'>조회 {formatNumberWithUnit(views)}</li>
         </ul>
      </section>
   );
}
