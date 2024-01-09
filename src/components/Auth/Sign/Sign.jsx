"use client";

import React from "react";

export default function Sign() {
  return (
    <div className="border p-20 flex flex-col items-center gap-6 m-20">
      <h1 className="font-bold text-2xl">회원가입</h1>
      <h3 className="  text-xl">회원가입을 해주세요</h3>

      <form
        className="flex flex-col gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(e.target.id.value, e.target.password.value);
        }}
      >
        <input
          name="id"
          key="id"
          type="text"
          placeholder="ID"
          className="border border-gray-300 p-2"
        />
        <input
          name="password"
          key="password"
          type="password"
          placeholder="Password"
          className="border border-gray-300 p-2"
        />
        <button className="mt-3 p-2">회원가입</button>
      </form>
    </div>
  );
}
