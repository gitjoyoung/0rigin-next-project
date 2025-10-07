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
import QuizHeader from "./quiz-header";

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
    <section className="flex flex-col justify-center w-full gap-6">
      {/* Progress Bar */}
      <div className="w-full flex flex-col gap-2">
        <QuizHeader quizData={quizData} />
        <div className="relative h-3">
          <Progress value={progress} className="rounded-none h-3" />
          <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold  text-white">
            {curIndex + 1} / {quizDataLength}
          </div>
        </div>
      </div>

      {/* Question Card */}
      <Card className="border-none bg-transparent dark:border-white shadow-none rounded-lg overflow-hidden">
        <CardHeader className="p-0 py-3">
          <CardTitle className="font-bold flex flex-col gap-2 leading-relaxed">
            <h1 className="text-xl">{curIndex + 1}. </h1>
            <p className="text-base">{currentQuestion.question_text}</p>
          </CardTitle>
        </CardHeader>

        <CardContent className="py-2 px-0">
          <QuizRadioButtonGroup
            options={currentQuestion.options}
            selectedOption={selectedOption}
            onSelect={handleOptionSelect}
          />
        </CardContent>

        {currentQuestion.explanation && (
          <Accordion
            key={curIndex}
            type="single"
            collapsible
            className="w-full"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="flex items-center gap-2 text-sm">
                  <FileQuestion size={20} />
                  <span className="font-semibold">힌트 보기</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <p className="font-medium leading-relaxed whitespace-pre-line">
                  {currentQuestion.explanation}
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
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
