"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

export default function Sign() {
  const router = useRouter();

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    const userId = e.target.id.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    const isUserIdValid = await validateUserId(userId);

    if (!isUserIdValid || !validatePassword(password, confirmPassword)) {
      return;
    }

    await fetchSignUpRequest({
      userid: userId,
      password: password,
    });
  };

  const validatePassword = (password, confirmPassword) => {
    if (password === confirmPassword) {
      return true;
    } else {
      alert("비밀번호가 같지 않습니다");
      return false;
    }
  };
  const fetchSignUpRequest = async (userData) => {
    const options = {
      url: process.env.NEXT_PUBLIC_API_URL + "users",
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(userData),
    };
    try {
      const response = await axios(options);
      alert("성공 :회원가입에 성공 하였습니다.");
      // router.push("/login");
    } catch (error) {
      alert("실패 :회원가입에 실패 하였습니다.");
    }
  };

  const validateUserId = async (userId) => {
    if (userId.length < 4) {
      alert("아이디 4자 미만 ");
      return false;
    }
    const safeRegex = /^[a-zA-Z0-9]+$/;
    if (!safeRegex.test(userId)) {
      alert("허용되지 않는 문자 포함");
      return false;
    }

    const options = {
      url: process.env.NEXT_PUBLIC_API_URL + `users?userid=${userId}`,
      method: "get",
      headers: {
        "Content-Type": "application/json",
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
      alert("response error :", error);
      return false;
    }
  };

  return (
    <section className="border p-20 flex flex-col items-center gap-6 mt-3 ">
      <h1 className="font-bold text-2xl">회원가입</h1>
      <h3 className="  text-xl">회원가입을 해주세요</h3>

      <form className="flex flex-col gap-3" onSubmit={handleSignUpSubmit}>
        <input
          name="id"
          key="id"
          type="text"
          placeholder="아이디(4자리 이상 영문)"
          className="border border-gray-300 p-2"
        />
        <input
          name="password"
          key="password"
          type="password"
          placeholder="비밀번호"
          className="border border-gray-300 p-2"
        />
        <input
          name="confirmPassword"
          key="confirmPassword"
          type="password"
          placeholder="비밀번호 재확인"
          className="border border-gray-300 p-2"
        />
        <button className="mt-3 p-2">회원가입</button>
      </form>
    </section>
  );
}
