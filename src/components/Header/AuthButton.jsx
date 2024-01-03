"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function AuthButton({ name }) {
  const router = useRouter();

  const [isLoggedIn, setLoggedIn] = useState(false);
  return (
    <div className=" text-sm flex gap-3 w-48 justify-end">
      {isLoggedIn ? (
        <div>
          <p>{`${name}님 반갑습니다`}</p>
          <div className="flex gap-2 justify-end">
            <button className="text-xs" onClick={() => setLoggedIn(false)}>
              로그아웃
            </button>
            <button className="text-xs">마이페이지</button>
          </div>
        </div>
      ) : (
        <>
          <button className=" text-sm" onClick={() => setLoggedIn(true)}>
            로그인 버튼
          </button>
          <button className=" text-sm">회원가입</button>
        </>
      )}
    </div>
  );
}
