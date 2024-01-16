"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

export default function BoardCreateForm(props) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    console.log(showPassword);
    setShowPassword(!showPassword);
  };
  const fetchCreate = async (e) => {
    e.preventDefault();
    const dataObject = {
      nickname: e.target.nickname.value,
      password: e.target.password.value,
      title: e.target.title.value,
      body: e.target.body.value,
    };
    const options = {
      url: `${process.env.NEXT_PUBLIC_API_URL}board`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(dataObject),
    };
    try {
      const res = await axios(options);
      const data =res.data;
      console.log(res.data);
      router.push(`/board/read/${data.id}`)
    } catch (error) {
      console.log("error :", error);
    }
  };
  return (
    <section className=' border m-1 p-2 '>
      <h1 className='text-4xl'> 글쓰기</h1>
      <form className='w-full' onSubmit={(e) => fetchCreate(e)}>
        <div className='flex flex-wrap items-center gap-2 m-3'>
          <div>
            <label htmlFor='nickname'>닉네임</label>
            <input
              autoComplete='current-password'
              className='border w-[135px] p-1 ml-2 nh'
              type='text'
              name='nickname'
              placeholder='닉네임'
            />
          </div>
          <div>
            <label htmlFor='password'>비밀번호</label>
            <input
              autoComplete='current-password'
              className='border w-[100px] p-1 ml-2'
              type={showPassword ? "text" : "password"}
              name='password'
              placeholder='비밀번호'
            />
            <button key='button' type='button' onClick={handleShowPassword}>
              {showPassword ? "패스워드 보이기" : "패스워드 감추기"}
            </button>
          </div>
        </div>

        <div className=' '>
          <input className='border w-full p-2 mt-2 mb-2 ' type='text' name='title' placeholder='제목' />
          <textarea className='w-full h-[30vh] p-2 border' name='body' placeholder='내용을 채워주세요 !' />
        </div>
        <div className='flex gap-6 justify-between p-1 mt-3 mb-3'>
          <button type='button' onClick={() => router.back()} className='p-3'>
            취소 하기
          </button>
          <button type='submit' className='p-3'>
            제출 하기{" "}
          </button>
        </div>
      </form>
    </section>
  );
}
