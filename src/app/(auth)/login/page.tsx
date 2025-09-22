import { LoginForm, SignButton } from "@/feature/login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "로그인",
  description: "0RIGIN(제로리진) 로그인 페이지입니다.",
};

const Description = () => (
  <div className="text-center space-y-2">
    <h2 className="text-3xl font-bold tracking-tight">환영합니다</h2>
    <p className="text-muted-foreground text-sm">
      {'"모든 위대한 여정은 작은 한 걸음에서 시작됩니다"'}
    </p>
  </div>
);

export default function LoginPage() {
  return (
    <article className="flex justify-center items-center flex-col mx-1 mt-10 gap-8">
      <Description />
      <LoginForm />
      <SignButton />
    </article>
  );
}
