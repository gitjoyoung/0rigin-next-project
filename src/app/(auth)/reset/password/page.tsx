import ResetPassword from "@/widgets/reset-password";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "비밀번호 재설정",
  description: "0RIGIN(제로리진) 계정의 비밀번호를 재설정합니다.",
};

export default function page({
  searchParams,
}: {
  searchParams: { code: string };
}) {
  const code = searchParams.code;
  if (!code) {
    return <div>Invalid code</div>;
  } else {
    return <ResetPassword code={code} />;
  }
}
