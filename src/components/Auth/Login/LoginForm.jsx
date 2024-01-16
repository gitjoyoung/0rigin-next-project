'use client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function Login() {
  const DEFAULT_COLOR = 'border-gray-300';
  const ERROR_COLOR = 'border-red-500';
  /** 아이디 검증실패시 테두리 색 변경  */
  const [idErrorColor, setIdErrorColor] = useState(DEFAULT_COLOR);
  /** 패스워드 검증실패시 테두리 색 변경  */
  const [passWordErrorColor, setPassWordErrorColor] = useState(DEFAULT_COLOR);

  const router = useRouter();
  /** 로그인 제출*/
  const loginFormHandle = async (e) => {
    e.preventDefault();
    const LoginformData = new FormData(e.currentTarget);
    const userId = LoginformData.get('id');
    const password = LoginformData.get('password');

    // 아이디 유효성 검사
    if (!userId || userId.length < 3) {
      setIdErrorColor(ERROR_COLOR);
      console.log('ID 에러');
      return;
    } else {
      setIdErrorColor(DEFAULT_COLOR);
    }

    // 비밀번호 유효성 검사
    if (!password || password.length < 6) {
      setPassWordErrorColor(ERROR_COLOR);
      console.log('비밀번호 에러');
      return;
    } else {
      setPassWordErrorColor(DEFAULT_COLOR);
    }

    const sucsess = await fetchLoginRequest(userId, password);
  };

  const fetchLoginRequest = async (userId, password) => {
    const options = {
      url: `${process.env.NEXT_PUBLIC_API_URL}users?userid=${userId}&password=${password}`,
      method: 'get',
    };
    console.log(userId, password);
    try {
      const res = await axios(options);
      // 임시 로그인 성공 여부 확인
      console.log(res.data);
      if (res.data.length > 0) {
        console.log('로그인 성공!');
        router.push('/');
      } else {
        console.log('로그인 실패. 아이디 또는 비밀번호가 일치하지 않습니다.');
      }
    } catch (error) {
      console.error('로그인 요청 오류:', error);
    }
  };

  return (
    <section className=' w-full flex justify-center '>
      <div className='border p-10 flex items-center flex-col gap-6 m-3  w-full max-w-[300px]'>
        <div>
          <h1 className='font-bold  text-2xl'>로그인</h1>
        </div>

        <form className='flex flex-col gap-3' onSubmit={loginFormHandle}>
          <input
            name='id'
            key='id'
            type='text'
            placeholder='ID'
            className={`border  p-2 ${idErrorColor}`}
          />
          <input
            name='password'
            key='password'
            type='password'
            placeholder='Password'
            className={`border  p-2 ${passWordErrorColor}`}
          />
          <button className='mt-3 p-2'>로그인</button>
        </form>
        <div className=' text-sm flex gap-5  '>
          <Link href={'/'}>아이디 분실</Link>
          <Link href={'/'}>비밀번호 분실</Link>
        </div>
      </div>
    </section>
  );
}
