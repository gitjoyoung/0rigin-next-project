import SignUpFlow from "@/widgets/signup/ui/signup-flow";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "일반 회원가입 - 0RIGIN(제로리진)",
  description: "0RIGIN(제로리진) 회원가입을 위한 정보를 입력해 주세요.",
};

export default async function SignFormPage() {
  return (
    <div className="py-6 px-4">
      <SignUpFlow />
    </div>
  );
}
