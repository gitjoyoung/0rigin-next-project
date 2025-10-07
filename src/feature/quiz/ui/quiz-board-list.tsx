import type { Quiz } from "@/entities/quiz";
import { Badge } from "@/shared/shadcn/ui/badge";
import { Button } from "@/shared/shadcn/ui/button";
import { Card, CardContent } from "@/shared/shadcn/ui/card";
import { Skeleton } from "@/shared/shadcn/ui/skeleton";
import { ArrowRight, Plus } from "lucide-react";
import { nanoid } from "nanoid";
import Image from "next/image";
import Link from "next/link";

interface Props {
  quizList: Quiz[];
  isLoading?: boolean;
}

// 스켈레톤 로딩 컴포넌트
function QuizCardSkeleton() {
  return (
    <Card className="h-24" aria-hidden="true">
      <div className="flex p-3 gap-3 h-full items-center">
        <Skeleton className="w-16 h-16 rounded-md flex-shrink-0" />
        <div className="flex-1 min-w-0 space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-full" />
        </div>
      </div>
    </Card>
  );
}

export default function QuizBoardList({ quizList, isLoading = false }: Props) {
  const DEFAULT_IMAGE = "/images/mascot/logo.webp";

  // 로딩 상태 UI
  if (isLoading) {
    return (
      <section
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        aria-label="퀴즈 목록 로딩 중"
        role="status"
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <QuizCardSkeleton key={index} />
        ))}
      </section>
    );
  }

  // 빈 상태 UI
  if (!quizList || quizList.length === 0) {
    return (
      <section
        className="flex flex-col items-center justify-center py-16 text-center"
        role="region"
        aria-label="퀴즈 없음 안내"
      >
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            검색 결과가 없습니다
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            첫 번째 퀴즈를 만들어보세요!
          </p>
          <Button asChild size="sm">
            <Link
              href="/quiz/create"
              className="flex items-center gap-2"
              aria-label="첫 번째 퀴즈 만들기"
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
              퀴즈 만들기
            </Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      role="region"
      aria-label={`${quizList.length}개의 퀴즈 목록`}
    >
      {quizList.map((quiz, index) => (
        <Card
          key={nanoid()}
          className="group overflow-hidden hover:shadow-md transition-shadow h-24 relative"
          role="article"
          aria-labelledby={`quiz-title-${index}`}
        >
          <Link
            href={`/quiz/${quiz.id}`}
            className="flex p-3 gap-3 h-full justify-start "
            aria-describedby={
              quiz.description ? `quiz-description-${index}` : undefined
            }
          >
            {/* 퀴즈 아이콘 */}
            <div className="flex-shrink-0 flex p-1 items-center justify-center shadow-sm dark:bg-blue-900/20 rounded-md overflow-hidden">
              <Image
                src={DEFAULT_IMAGE}
                alt={quiz.title}
                className="w-16 h-16 object-cover"
                width={64}
                height={64}
              />
            </div>

            {/* 퀴즈 정보 */}
            <CardContent className="flex flex-col justify-between p-0 min-w-0 flex-1">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3
                    id={`quiz-title-${index}`}
                    className="text-sm font-medium line-clamp-1 text-gray-900 dark:text-white "
                  >
                    {quiz.title}
                  </h3>
                  {quiz.is_public && (
                    <Badge variant="secondary" className="text-xs h-4 px-1.5">
                      공개
                    </Badge>
                  )}
                </div>
                {quiz.description && (
                  <p
                    id={`quiz-description-${index}`}
                    className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1"
                  >
                    {quiz.description}
                  </p>
                )}
              </div>
            </CardContent>
            <ArrowRight
              className="w-4 h-4 text-gray-400  absolute right-3 bottom-3 "
              aria-hidden="true"
            />
          </Link>
        </Card>
      ))}
    </section>
  );
}
