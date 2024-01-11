"use client";
import { termsContent } from "@/constants/Auth/termsContent";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function TermsOfService({ onTermsAgreed }) {
  const terms = termsContent;

  const [checkTerm, setCheckTerm] = useState(false);
  const handleCheckboxChange = () => {
    setCheckTerm(!checkTerm);
  };
  function movePage() {
    if (checkTerm) {
      onTermsAgreed();
    } else {
      alert("이용약관 동의 해주세요");
    }
  }

  return (
    <section className=" flex flex-col items-center m-3">
      <div className=" ">
        <h2 className="font-bold text-lg">이용약관</h2>
        <div className=" border border-gray-300 rounded-lg h-48  p-2 overflow-y-auto">
          <p>{terms}</p>
        </div>
      </div>
      <div className="flex m-3 gap-3">
        <input
          type="checkbox"
          checked={checkTerm}
          onChange={handleCheckboxChange}
          className="  scale-150 "
          value="asd"
        />
        <p>이용약관에 동의하기</p>
      </div>
      <div className="flex  items-center justify-center gap-4">
        <button className="p-2 w-[100px] " onClick={movePage}>
          확인
        </button>
      
      </div>
    </section>
  );
}
