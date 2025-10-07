import { LoginForm } from "@/feature/login";
import LoginDescription from "@/feature/login/ui/login-description";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "로그인",
  description: "0RIGIN(제로리진) 로그인 페이지입니다.",
};

export default function LoginPage() {
  return (
    <article className="flex justify-center items-center flex-col gap-8 p-4">
      <LoginDescription />
      <LoginForm />
    </article>
  );
}
