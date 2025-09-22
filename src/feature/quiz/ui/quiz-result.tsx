"use client";

import { ROUTE_QUIZ } from "@/constants/pathname";
import type { QuizQuestion } from "@/entities/quiz";
import { Button } from "@/shared/shadcn/ui/button";
import { Card, CardContent, CardHeader } from "@/shared/shadcn/ui/card";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowLeft, Check, X } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

interface Props {
  totalQuestions: number;
  userAnswers: Record<number, string>;
  questions: QuizQuestion[];
  quizId: number;
}

// 결과 데이터 상수
const RESULT_LEVELS = {
  PERFECT: {
    min: 90,
    message: "완벽해요!",
    emoji: "🎉",
    color: "from-emerald-500 to-green-600",
    textColor: "text-emerald-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-950",
  },
  EXCELLENT: {
    min: 70,
    message: "잘했어요!",
    emoji: "👏",
    color: "from-blue-500 to-indigo-600",
    textColor: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950",
  },
  GOOD: {
    min: 50,
    message: "좋아요!",
    emoji: "👍",
    color: "from-yellow-500 to-amber-600",
    textColor: "text-yellow-600",
    bgColor: "bg-yellow-50 dark:bg-yellow-950",
  },
  NEED_IMPROVEMENT: {
    min: 0,
    message: "다시 도전해보세요!",
    emoji: "💪",
    color: "from-rose-500 to-red-600",
    textColor: "text-rose-600",
    bgColor: "bg-rose-50 dark:bg-rose-950",
  },
} as const;

// 애니메이션 상수
const ANIMATION_CONFIG = {
  FADE_IN: { duration: 0.5 },
  SLIDE_UP: { duration: 0.5, y: 20 },
  SCALE_IN: { duration: 0.3 },
  SPRING: { duration: 0.8, type: "spring", stiffness: 100 },
  DELAYS: {
    HEADER: 0.2,
    TITLE: 0.4,
    STATS: 0.3,
    BADGES: { CORRECT: 0.5, INCORRECT: 0.6 },
    PERCENTAGE: 0.5,
    SCORE: 0.7,
    MESSAGE: 1.2,
    BUTTONS: { RETRY: 1.4, BACK: 1.6 },
  },
} as const;

export default function QuizResult({
  totalQuestions,
  userAnswers,
  questions,
  quizId,
}: Props) {
  // 정답 개수 계산
  const correctAnswers = Object.entries(userAnswers).reduce(
    (count, [index, answer]) => {
      const question = questions[Number(index)];
      return question?.correct_answer.toString() === answer ? count + 1 : count;
    },
    0,
  );

  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  const incorrectAnswers = totalQuestions - correctAnswers;

  // Framer Motion 애니메이션
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, percentage, {
      duration: 2,
      ease: "easeOut",
      delay: 0.5,
    });
    return controls.stop;
  }, [count, percentage]);

  // 결과 데이터 계산
  const getResultData = () => {
    if (percentage >= RESULT_LEVELS.PERFECT.min) return RESULT_LEVELS.PERFECT;
    if (percentage >= RESULT_LEVELS.EXCELLENT.min)
      return RESULT_LEVELS.EXCELLENT;
    if (percentage >= RESULT_LEVELS.GOOD.min) return RESULT_LEVELS.GOOD;
    return RESULT_LEVELS.NEED_IMPROVEMENT;
  };

  const resultData = getResultData();

  return (
    <div className="h-full flex items-center justify-center">
      <motion.div
        className="w-full max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Card className="overflow-hidden border-0 shadow-2xl rounded-none">
          {/* 헤더 그라데이션 */}
          <motion.div
            className={`h-32 bg-gradient-to-br ${resultData.color}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              ...ANIMATION_CONFIG.FADE_IN,
              delay: ANIMATION_CONFIG.DELAYS.HEADER,
            }}
          >
            <div className="relative h-full flex items-center justify-center">
              <motion.div
                className="text-center flex gap-3 items-center text-white"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  ...ANIMATION_CONFIG.FADE_IN,
                  delay: ANIMATION_CONFIG.DELAYS.TITLE,
                }}
              >
                <div className="text-5xl mb-3">{resultData.emoji}</div>
                <h1 className="text-2xl font-bold">퀴즈 결과!</h1>
              </motion.div>
            </div>
          </motion.div>

          <CardHeader className="pb-6">
            <motion.p
              className="text-muted-foreground text-center mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                ...ANIMATION_CONFIG.FADE_IN,
                delay: ANIMATION_CONFIG.DELAYS.STATS,
              }}
            >
              {correctAnswers}/{totalQuestions}를 맞췄다
            </motion.p>

            <motion.div
              className="flex justify-center gap-4 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                ...ANIMATION_CONFIG.SLIDE_UP,
                delay: ANIMATION_CONFIG.DELAYS.STATS,
              }}
            >
              <motion.div
                className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950 px-3 py-2 rounded-full"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  ...ANIMATION_CONFIG.SCALE_IN,
                  delay: ANIMATION_CONFIG.DELAYS.BADGES.CORRECT,
                }}
              >
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  정답 {correctAnswers}
                </span>
              </motion.div>
              <motion.div
                className="flex items-center gap-2 bg-rose-50 dark:bg-rose-950 px-3 py-2 rounded-full"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  ...ANIMATION_CONFIG.SCALE_IN,
                  delay: ANIMATION_CONFIG.DELAYS.BADGES.INCORRECT,
                }}
              >
                <X className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                <span className="text-sm font-medium text-rose-600 dark:text-rose-400">
                  오답 {incorrectAnswers}
                </span>
              </motion.div>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                ...ANIMATION_CONFIG.SLIDE_UP,
                delay: ANIMATION_CONFIG.DELAYS.PERCENTAGE,
              }}
            >
              <motion.div
                className={`text-6xl font-black mb-4 ${resultData.textColor}`}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  ...ANIMATION_CONFIG.SPRING,
                  delay: ANIMATION_CONFIG.DELAYS.SCORE,
                }}
              >
                <motion.span>{rounded}</motion.span>%
              </motion.div>
              <motion.h3
                className="text-base px-6 py-2 mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  ...ANIMATION_CONFIG.FADE_IN,
                  delay: ANIMATION_CONFIG.DELAYS.MESSAGE,
                }}
              >
                {resultData.message}
              </motion.h3>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                ...ANIMATION_CONFIG.SLIDE_UP,
                delay: ANIMATION_CONFIG.DELAYS.BUTTONS.RETRY,
              }}
            >
              <Button
                onClick={() => (window.location.href = `/quiz/${quizId}`)}
                variant="outline"
                size="lg"
                className="w-full"
              >
                다시 풀기
              </Button>
            </motion.div>
          </CardHeader>

          <CardContent className="space-y-8 pb-8">
            <hr className="border-border" />

            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                ...ANIMATION_CONFIG.SLIDE_UP,
                delay: ANIMATION_CONFIG.DELAYS.BUTTONS.BACK,
              }}
            >
              <Link href={ROUTE_QUIZ}>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 text-base font-semibold hover:scale-105 transition-transform"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  목록으로
                </Button>
              </Link>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
