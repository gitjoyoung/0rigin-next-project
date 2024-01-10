// pages/sign/[[...slug]].js

import Link from "next/link";

const SignPage = ({ slug }) => {
  return (
    <div>
      <h1> 오리진 커뮤니티에 오신 것을 환영합니다</h1>
      <h3>회원가입을 하시겠습니까?</h3>
      <Link href={"/"}>이미 회원입니다 로그인 페이지</Link>
      <Link href={"sign/signup"}>네 할게요</Link>
    </div>
  );
};

export default SignPage;
