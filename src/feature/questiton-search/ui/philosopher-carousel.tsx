"use client";

import { Badge } from "@/shared/shadcn/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/shadcn/ui/card";
import { cn } from "@/shared/utils/cn";
import { ExternalLink, FileText } from "lucide-react";
import Link from "next/link";
import { MatchingResult } from "../types";

export default function PhilosopherCarousel({
  results,
  category = "철학",
}: {
  results: MatchingResult[];
  category?: string;
}) {
  return (
    <div className="w-full">
      <div className="text-center my-6">
        <p className="text-2xl  mt-1">
          {category} 분야에서 총 {results.length}명의 인물이 답변했습니다
        </p>
      </div>

      {/* 통합된 가로 스크롤 캐러셀 */}
      <div className="overflow-x-auto sm:scrollbar-visible scrollbar-hide scroll-smooth snap-x snap-mandatory scroll-px-4">
        <div className="flex gap-4 pb-4 min-w-max px-4 lg:px-0">
          {results.map((result) => (
            <Card
              key={result.philosopher.id}
              className="w-[280px] sm:w-[300px] lg:w-[380px] min-w-[280px] sm:min-w-[300px] lg:min-w-[380px] flex-shrink-0 relative sm:min-h-[650px] h-[500px] flex flex-col snap-center"
            >
              <CardHeader className="pb-2 sm:pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg sm:text-xl font-bold mb-2 line-clamp-1">
                      {result.philosopher.name}
                    </CardTitle>
                  </div>
                  <Badge
                    variant="secondary"
                    className="ml-2 text-sm px-2 sm:px-3 py-1"
                  >
                    {result.relevanceScore}점
                  </Badge>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                  <span>{result.philosopher.era}</span>
                  <span>•</span>
                  <span>{result.philosopher.nationality}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {result.philosopher.mainPhilosophy}
                </p>
              </CardHeader>

              <CardContent className="flex-1 overflow-y-auto">
                {/* 주요 사유 */}
                <div className="space-y-2 my-2">
                  {result.philosopher.answers
                    .slice(0, 2)
                    .map((answer, index) => (
                      <div
                        key={index}
                        className="p-3 sm:p-4 bg-muted/50 rounded-lg border border-muted/30"
                      >
                        <p className="text-sm leading-relaxed italic">
                          &ldquo;{answer}&rdquo;
                        </p>
                      </div>
                    ))}
                </div>
                <div className="mt-4">
                  <p
                    id={`description-${result.philosopher.id}`}
                    className={cn(
                      "text-sm text-muted-foreground leading-relaxed",
                    )}
                  >
                    {result.philosopher.description}
                  </p>
                </div>
              </CardContent>
              {result.relatedPosts && result.relatedPosts.length > 0 && (
                <CardFooter className="border-t p-0">
                  <div className="p-3 w-full">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 ">
                        <FileText className="h-4 w-4 text-primary" />
                        <h4 className="font-semibold text-sm">관련 게시글</h4>
                      </div>
                      {result.relatedPosts.slice(0, 2).map((post) => (
                        <Link
                          key={post.id}
                          href={`/board/${post.id}`}
                          className="flex items-center gap-2 p-2 sm:p-3 text-sm truncate transition-colors text-muted-foreground hover:text-primary"
                        >
                          <span className="truncate ">{post.title}</span>
                          <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
