"use client";
import React, { useState } from "react";
export default function login() {
  const DEFAULT_COLOR = "border-gray-300";
  const ERROR_COLOR = "border-red-500";
  // JavaScript 코드로 사용자의 접속 기기 확인
  const [idErrorColor, setIdErrorColor] = useState(DEFAULT_COLOR);
  const [passWordErrorColor, setPassWordErrorColor] = useState(DEFAULT_COLOR);

  const loginFormHandle = (e) => {
    e.preventDefault();
    const LoginformData = new FormData(e.currentTarget);
    const id = LoginformData.get("id");
    const password = LoginformData.get("password");
    if (!id || id.length < 3) {
      setIdErrorColor(ERROR_COLOR);
      console.log("ID 에러");
      return;
    } else {
      setIdErrorColor(DEFAULT_COLOR);
    }

    // 비밀번호 유효성 검사
    if (!password || password.length < 6) {
      setPassWordErrorColor(ERROR_COLOR);
      console.log("비밀번호 에러");
      return;
    } else {
      setPassWordErrorColor(DEFAULT_COLOR);
    }
    console.log(LoginformData.get("id"), LoginformData.get("password"));
  };

  const loginFetch = () => {};

  return (
    <section className="border p-20 flex items-center flex-col gap-6 m-20">
      <h1 className="font-bold  text-2xl">로그인</h1>
      <form className="flex flex-col gap-3" onSubmit={loginFormHandle}>
        <input
          name="id"
          key="id"
          type="text"
          placeholder="ID"
          className={`border  p-2 ${idErrorColor}`}
        />
        <input
          name="password"
          key="password"
          type="password"
          placeholder="Password"
          className={`border  p-2 ${passWordErrorColor}`}
        />
        <button className="mt-3 p-2">로그인</button>
      </form>
    </section>
  );
}
