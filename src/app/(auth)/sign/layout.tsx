import { Metadata } from "next";

export const metadata: Metadata = {
  title: "회원가입 페이지",
  description: "0RIGIN(제로리진) 약관에 동의하고 회원가입을 진행합니다.",
};
export default function layout({ children }: { children: React.ReactNode }) {
  return <div className="my-12">{children}</div>;
}
