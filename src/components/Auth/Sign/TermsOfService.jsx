"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function TermsOfService() {
  const termsContent = `
  네이버 서비스 및 제품(이하 ‘서비스’)을 이용해 주셔서 감사합니다. 본 약관은 다양한 네이버 서비스의 이용과 관련하여 네이버 서비스를 제공하는 네이버 주식회사(이하 ‘네이버’)와 이를 이용하는 네이버 서비스 회원(이하 ‘회원’) 또는 비회원과의 관계를 설명하며, 아울러 여러분의 네이버 서비스 이용에 도움이 될 수 있는 유익한 정보를 포함하고 있습니다.


`;

  const router = useRouter();
  const [checkTerm, setCheckTerm] = useState(false);
  const handleCheckboxChange = () => {
    setCheckTerm(!checkTerm);
  };
  function movePage() {
    if (checkTerm) {
      console.log("페이지 이동");
      router.push(`/read/${lastId}`);
      router.refresh();
    } else {
      alert("이용약관 동의 해주세요");
    }
  }

  return (
    <section className=" flex flex-col items-center m-3">
      <acticle className=" ">
        <h2 className="font-bold text-lg">이용약관</h2>
        <div className=" border border-gray-300 rounded-lg h-48  p-2 overflow-y-auto">
          {termsContent}
        </div>
      </acticle>
      <acticle className="flex m-3 gap-3">
        <input
          type="checkbox"
          checked={checkTerm}
          onChange={handleCheckboxChange}
          className="  scale-150 "
          value="asd"
        />
        <p>이용약관에 동의하기</p>
      </acticle>
      <acticle className="flex  items-center justify-center gap-4">
        <button className="p-2 " onClick={movePage}>
          회원가입 하러가기
        </button>
        <button className="p-2 " onClick={movePage}>
          돌아 가기{" "}
        </button>
      </acticle>
    </section>
  );
}
