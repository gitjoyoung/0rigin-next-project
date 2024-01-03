"use client";
import React, { useState } from "react";

export default function AuthButton() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  return (
    <div className="flex gap-3">
      {isLoggedIn ? (
        <p>{"테스터님 반갑습니다"}</p>
      ) : (
        <>
          <button
            className="border border-black p-1 "
            type="button"
            onClick={() => setLoggedIn(true)}
          >
            로그인 버튼
          </button>
          <button className="btn">회원가입</button>
        </>
      )}
    </div>
  );
}
