'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Sign() {
   const router = useRouter();

   const handleSignUpSubmit = async (e) => {
      e.preventDefault();
      const userid = e.target.id.value;
      const password = e.target.password.value;
      const confirmPassword = e.target.confirmPassword.value;
      const gender = e.target.gender.value;
      const isUserIdValid = await validateUserId(userid);

      if (!isUserIdValid || !validatePassword(password, confirmPassword)) {
         return;
      }

      await fetchSignUpRequest({
         userid,
         password,
         gender,
      });
   };

   const validatePassword = (password, confirmPassword) => {
      if (password === confirmPassword) {
         return true;
      } else {
         alert('비밀번호가 같지 않습니다');
         return false;
      }
   };
   const fetchSignUpRequest = async (userData) => {
      const options = {
         url: process.env.NEXT_PUBLIC_API_URL + 'users',
         method: 'post',
         headers: {
            'Content-Type': 'application/json',
         },
         data: JSON.stringify(userData),
      };
      try {
         const response = await axios(options);
         alert('성공 :회원가입에 성공 하였습니다.');
         // router.push("/login");
      } catch (error) {
         alert('실패 :회원가입에 실패 하였습니다.');
      }
   };

   const validateUserId = async (userId) => {
      if (userId.length < 4) {
         alert('아이디 4자 미만 ');
         return false;
      }
      const safeRegex = /^[a-zA-Z0-9]+$/;
      if (!safeRegex.test(userId)) {
         alert('허용되지 않는 문자 포함');
         return false;
      }

      const options = {
         url: process.env.NEXT_PUBLIC_API_URL + `users?userid=${userId}`,
         method: 'get',
         headers: {
            'Content-Type': 'application/json',
         },
      };
      try {
         const response = await axios(options);
         if (response.data.length > 0) {
            alert(`${userId}사용자가 존재합니다.`);
            return false;
         } else {
            return true;
         }
      } catch (error) {
         alert('response error :', error);
         return false;
      }
   };

   return (
      <section className=' w-full flex justify-center '>
         <div className='border p-10 flex items-center flex-col gap-6 m-3  w-full max-w-[330px]'>
            <h1 className='font-bold text-2xl'>회원가입</h1>
            <h3 className='  text-xl'>회원가입시 다양한 혜택을 받을 수 있습니다.</h3>

            <form className='flex flex-col gap-1' onSubmit={handleSignUpSubmit}>
               <ul className='flex gap-3 justify-center'>
                  <li>
                     <label>
                        <input type='radio' className='m-1' name='gender' value='man' />
                        남성
                     </label>
                  </li>
                  <li>
                     <label>
                        <input type='radio' className='m-1' name='gender' value='girl' />
                        여성
                     </label>
                  </li>
                  <li>
                     <label>
                        <input type='radio' className='m-1' name='gender' value='other' />
                        기타
                     </label>
                  </li>
               </ul>
               <p className='text-xs text-red-500'>*성별을 선택해 주세요</p>
               <input
                  name='id'
                  key='id'
                  type='text'
                  placeholder='아이디(4자리 이상 영문)'
                  className='border border-gray-300 p-2'
               />
               <p className='text-xs'>아이디를 확인해 주세요</p>

               <input
                  name='password'
                  key='password'
                  type='password'
                  placeholder='비밀번호'
                  className='border border-gray-300 p-2'
               />
               <p className='text-xs'>비밀번호를 확인해 주세요</p>

               <input
                  name='confirmPassword'
                  key='confirmPassword'
                  type='password'
                  placeholder='비밀번호 재확인'
                  className='border border-gray-300 p-2'
               />
               <p className='text-xs'>비밀번호를 확인해 주세요</p>

               <button className='mt-3 p-2'>회원가입</button>
            </form>
         </div>
      </section>
   );
}
