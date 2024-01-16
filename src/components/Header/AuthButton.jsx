"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function AuthButton({ name }) {
  const router = useRouter();

  const [isLoggedIn, setLoggedIn] = useState(false);
  return (
    <div className=" text-sm flex gap-3 items-center w-48 justify-end">
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
          <button className=" text-sm" onClick={() => router.push("/login")}>
            로그인
          </button>
          <button className=" text-sm" onClick={() => router.push("/sign")}>
            회원가입
          </button>
        </>
      )}
    </div>
  );
}
