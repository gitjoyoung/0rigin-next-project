import Link from "next/link";

const SignPage = () => {
  const content = {
    welcomeMessage: `오리진 커뮤니티에 오신 것을 환영합니다 !`,
    registration: {
      question: "회원가입을 진행 하시겠습니까?",
      alreadyMemberMessage: "이미 회원이신가요?",
    },
    login: {
      href: "/login",
      buttonText: "이미 회원입니다.",
    },
    signup: {
      href: "sign/signup",
      buttonText: "네 좋아요 !",
    },
  };

  return (
    <div className="mt-20 mb-20 h-full w-full pr-10 pl-10 flex flex-col items-center gap-5 justify-center">
      <h1 className="font-bold text-3xl">{content.welcomeMessage}</h1>
      <h3>{content.registration.question}</h3>
      <div className="flex gap-8 items-center">
        <Link href={content.login.href}>
          <button className="p-2">{content.login.buttonText}</button>
        </Link>
        <Link href={content.signup.href}>
          <button className="p-2 font-semibold">
            {content.signup.buttonText}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SignPage;
