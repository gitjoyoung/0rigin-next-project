"use client";

import { QuizDetail } from "@/entities/quiz";
import QuizNavButton from "@/feature/quiz/ui/quiz-nav-button";
import QuizRadioButtonGroup from "@/feature/quiz/ui/quiz-radio-button-group";
import QuizResult from "@/feature/quiz/ui/quiz-result";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/shadcn/ui/accordion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/shadcn/ui/card";
import { Progress } from "@/shared/shadcn/ui/progress";
import { FileQuestion } from "lucide-react";
import { useQuiz } from "../hooks/use-quiz";

interface Props {
  quizData: QuizDetail | null;
}

export default function Quiz({ quizData }: Props) {
  const {
    quizDataLength,
    curIndex,
    selectedOption,
    showResult,
    progress,
    currentQuestion,
    handleIndexChange,
    handleOptionSelect,
    handleShowResult,
    userAnswers,
  } = useQuiz({ quizData });

  if (!quizData) return null;

  if (showResult) {
    return (
      <QuizResult
        quizId={quizData.id}
        totalQuestions={quizDataLength}
        userAnswers={userAnswers}
        questions={quizData.questions}
      />
    );
  }

  if (quizDataLength === 0 || !currentQuestion) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-muted-foreground">
              이 퀴즈에는 문제가 없습니다. 다른 퀴즈를 선택해주세요.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <section className="flex flex-col justify-center w-full gap-4">
      {/* Progress Bar */}
      <div className="w-full rounded-none overflow-hidden">
        <div className="relative h-4">
          <Progress value={progress} className="rounded-none h-4  " />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold mix-blend-difference text-white">
              {curIndex + 1} / {quizDataLength}
            </span>
          </div>
        </div>
      </div>

      {/* Question Card */}
      <Card className="border border-black bg-white dark:bg-black dark:border-white shadow-none rounded-lg overflow-hidden">
        <CardHeader className=" bg-black dark:bg-black text-white dark:text-white">
          <CardTitle className="font-bold text-xl leading-relaxed">
            Q{curIndex + 1}. {currentQuestion.question_text}
          </CardTitle>
          {currentQuestion.explanation && (
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue="item-1"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <div className="flex items-center gap-2 text-sm">
                    <FileQuestion size={20} />
                    <span className="font-semibold">힌트 보기</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="flex text-balance">
                  <p className="font-medium leading-relaxed whitespace-pre-line">
                    {currentQuestion.explanation}
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
        </CardHeader>

        <CardContent className=" bg-white dark:bg-black">
          <QuizRadioButtonGroup
            options={currentQuestion.options}
            selectedOption={selectedOption}
            onSelect={handleOptionSelect}
          />
        </CardContent>
      </Card>

      <QuizNavButton
        curIndex={curIndex}
        setCurIndex={handleIndexChange}
        quizDataLength={quizDataLength}
        onShowResult={handleShowResult}
      />
    </section>
  );
}
