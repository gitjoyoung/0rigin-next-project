import { getQuizzes } from "@/entities/quiz/api/quiz.service";
import QuizBoard from "@/widgets/quiz/ui/quiz-board";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "퀴즈",
  description: "매일매일 더 똑똑해지는 0RIGIN(제로리진) 퀴즈!",
};
export default async function QuizPage() {
  const quizzes = await getQuizzes(50, 0);

  return (
    <div className="container mx-auto px-4 py-6">
      <QuizBoard quizList={quizzes} />
    </div>
  );
}
