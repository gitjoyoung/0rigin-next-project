import { getUser } from "@/entities/auth";
import QuizCreateAuthCheck from "@/widgets/quiz/create/quiz-create-auth-check";
import QuizCreateForm from "@/widgets/quiz/create/quiz-create-form";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "퀴즈 제작",
  description: "0RIGIN(제로리진)에서 퀴즈를 제작해 보세요",
};

export default async function QuizCreatePage() {
  const user = await getUser();

  if (!user) {
    return <QuizCreateAuthCheck />;
  }

  return <QuizCreateForm />;
}
