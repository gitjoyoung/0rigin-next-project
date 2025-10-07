import { QuizDetail } from "@/entities/quiz";
import { Badge } from "@/shared/shadcn/ui/badge";
import { Card, CardContent } from "@/shared/shadcn/ui/card";
import Image from "next/image";

interface Props {
  quizData: QuizDetail | null;
}

export default function QuizHeader({ quizData }: Props) {
  if (!quizData) return null;
  const { title, description } = quizData;
  const DEFAULT_IMAGE = "/images/mascot/logo.webp";

  return (
    <Card className="border-0 rounded-t-lg  rounded-none shadow-none">
      <CardContent className="p-0">
        {/* 모든 화면에서 가로 배치 */}
        <div className="flex gap-3 sm:gap-4">
          {/* 퀴즈 이미지 */}
          <div className="w-12 h-12 sm:w-20 sm:h-20 shrink-0 bg-black dark:bg-white rounded-lg flex items-center justify-center overflow-hidden ">
            <Image
              src={DEFAULT_IMAGE}
              alt={title || "퀴즈 이미지"}
              className="w-full h-full object-cover"
              width={100}
              height={100}
            />
          </div>
          {/* 퀴즈 정보 */}
          <section className="flex-1 h-full flex sm:gap-1 flex-col justify-start min-w-0">
            <div className="flex gap-2">
              <h1 className="text-base sm:text-2xl font-bold text-black dark:text-white truncate">
                {title || ""}
              </h1>
              <Badge variant="secondary" className="w-fit text-xs shrink-0">
                퀴즈
              </Badge>
            </div>

            {description && (
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-1 sm:line-clamp-2">
                {description}
              </p>
            )}
          </section>
        </div>
      </CardContent>
    </Card>
  );
}
