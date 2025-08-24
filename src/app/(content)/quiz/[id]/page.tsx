import { getQuizById } from "@/entities/quiz/api/quiz.service";
import Quiz from "@/widgets/quiz/ui/quiz";
import QuizHeader from "@/widgets/quiz/ui/quiz-header";
import { Metadata } from "next";
import { cache } from "react";

interface Params {
  params: {
    id: string;
  };
}
const getCachedQuizById = cache(async (id: number) => {
  if (isNaN(id)) return null;
  const quiz = await getQuizById(id);
  if (!quiz) return null;
  return quiz;
});

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const quiz = await getCachedQuizById(Number(id));
  return {
    title: `${quiz && quiz.title} - 0RIGIN(제로리진) 퀴즈 페이지`,
    description:
      (quiz && quiz.description) ||
      `0RIGIN(제로리진)에서 ${quiz && quiz.title} 퀴즈를 풀어 더 똑똑해지세요.`,
  };
}

export default async function QuizDetailPage({ params }: Params) {
  const { id } = await params;
  const quiz = await getCachedQuizById(Number(id));

  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-center">
      <div className="flex flex-col justify-start px-4 py-6 max-w-[600px] w-full">
        <QuizHeader quizData={quiz} />
        <Quiz quizData={quiz} />
      </div>
    </div>
  );
}
