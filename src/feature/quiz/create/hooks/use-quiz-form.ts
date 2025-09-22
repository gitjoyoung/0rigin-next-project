import {
  CreateQuizQuestionRequest,
  CreateQuizRequest,
} from "@/entities/quiz/types";
import { useToast } from "@/shared/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { QuestionFormData } from "../types/quiz-form-types";

export function useQuizForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState<"basic" | "questions">("basic");
  const [questions, setQuestions] = useState<QuestionFormData[]>([]);

  const createQuizMutation = useMutation({
    mutationFn: async (quizData: CreateQuizRequest) => {
      const response = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quizData),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "퀴즈 생성에 실패했습니다");
      }
      return response.json();
    },
    onSuccess: (quiz) => {
      createQuestions(quiz.id);
    },
    onError: (error) => {
      toast({
        title: "오류가 발생했습니다",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const createQuestions = async (quizId: number) => {
    try {
      const validQuestions = questions.filter((q) => {
        const optionCount = [
          q.option_1,
          q.option_2,
          q.option_3,
          q.option_4,
        ].filter((opt) => opt && opt.trim()).length;
        return q.question_text.trim() && optionCount >= 2;
      });

      if (validQuestions.length === 0) {
        toast({
          title: "문제가 없습니다",
          description: "최소 1개의 문제를 입력해주세요",
          variant: "destructive",
        });
        return;
      }

      for (let i = 0; i < validQuestions.length; i++) {
        const question = validQuestions[i];
        const optionCount = [
          question.option_1,
          question.option_2,
          question.option_3,
          question.option_4,
        ].filter((opt) => opt && opt.trim()).length;

        const questionData: CreateQuizQuestionRequest = {
          quiz_id: quizId,
          question_number: i + 1,
          question_text: question.question_text,
          explanation: question.explanation || null,
          option_count: optionCount,
          option_1: question.option_1,
          option_2: question.option_2,
          option_3: question.option_3 || null,
          option_4: question.option_4 || null,
          option_5: null,
          correct_answer: question.correct_answer,
          points: 1,
        };

        const response = await fetch("/api/quiz/question", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(questionData),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "문제 생성에 실패했습니다");
        }
      }

      toast({
        title: "퀴즈가 생성되었습니다",
        description: "퀴즈 목록으로 이동합니다",
      });
      router.push("/quiz");
    } catch (error) {
      toast({
        title: "문제 생성에 실패했습니다",
        description:
          error instanceof Error
            ? error.message
            : "알 수 없는 오류가 발생했습니다",
        variant: "destructive",
      });
    }
  };

  const initializeQuestions = (questionCount: number) => {
    const newQuestions: QuestionFormData[] = [];
    for (let i = 0; i < questionCount; i++) {
      newQuestions.push({
        question_text: "",
        explanation: "",
        option_1: "",
        option_2: "",
        option_3: "",
        option_4: "",
        correct_answer: 1,
      });
    }
    setQuestions(newQuestions);
    setStep("questions");
  };

  const updateQuestion = (index: number, data: QuestionFormData) => {
    const newQuestions = [...questions];
    newQuestions[index] = data;
    setQuestions(newQuestions);
  };

  const moveQuestion = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= questions.length) return;

    const newQuestions = [...questions];
    const [movedQuestion] = newQuestions.splice(fromIndex, 1);
    newQuestions.splice(toIndex, 0, movedQuestion);
    setQuestions(newQuestions);
  };

  const removeQuestion = (index: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  const goBack = () => {
    setStep("basic");
  };

  const submitQuiz = (formData: any) => {
    const quizData: CreateQuizRequest = {
      title: formData.title,
      description: formData.description || null,
      is_public: true,
      time_limit: null,
      pass_score: formData.pass_score,
    };
    createQuizMutation.mutate(quizData);
  };

  return {
    step,
    questions,
    createQuizMutation,
    initializeQuestions,
    updateQuestion,
    moveQuestion,
    removeQuestion,
    goBack,
    submitQuiz,
  };
}
