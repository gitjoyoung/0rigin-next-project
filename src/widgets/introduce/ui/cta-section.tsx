import { Button } from "@/shared/shadcn/ui/button";
import Link from "next/link";

export default function CtaSection() {
  return (
    <div className="text-center">
      <h2 className="text-lg sm:text-2xl font-semibold mb-4">
        지금 시작해보세요
      </h2>
      <p className="text-xs sm:text-base text-muted-foreground mb-8 max-w-2xl mx-auto">
        0RIGIN 커뮤니티에 참여하여 다양한 생각을 나누고 함께 성장해보세요
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild variant="outline" size="lg">
          <Link href="/board/latest">최신글 보기</Link>
        </Button>
        <Button asChild size="lg">
          <Link href="/quiz">퀴즈 풀기</Link>
        </Button>
      </div>
    </div>
  );
}
