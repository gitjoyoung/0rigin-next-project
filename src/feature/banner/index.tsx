"use client";

import { Button } from "@/shared/shadcn/ui/button";
import type { Tables } from "@/shared/types";
import { cn } from "@/shared/utils/cn";
import { formatNumberCompact } from "@/shared/utils/format-number";
import { Pause, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const SLIDE_DURATION = 5000;

export default function Banner({ data }: { data: Tables<"posts">[] }) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const currentIndexRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    if (!isPaused && data.length > 1) {
      timerRef.current = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % data.length);
      }, SLIDE_DURATION);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentIndex, data.length, isPaused]);

  const togglePlayPause = () => {
    setIsPaused((prev) => !prev);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % data.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + data.length) % data.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // 터치 슬라이딩 핸들러
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    }
    if (isRightSwipe) {
      goToPrev();
    }
  };

  if (!data.length) return null;

  const currentPost = data[currentIndex];
  const hasImage =
    currentPost.thumbnail &&
    currentPost.thumbnail !== "/images/mascot/new_logo.webp";

  return (
    <article className="relative w-full border border-black  rounded-lg overflow-hidden">
      <div
        className="sm:hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* 상단 이미지 - 이미지가 있을 때만 표시 */}
        {
          <div className="relative h-48 bg-red-500">
            <Image
              src={"/images/mascot/new_logo.webp"}
              alt={"banner"}
              className="w-full h-full object-cover"
              fill
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        }

        {/* 하단 콘텐츠 - 이미지 유무에 관계없이 고정 높이 */}
        <div
          className={cn(
            "p-4 space-y-3",
            hasImage ? "" : "h-48 flex flex-col justify-center",
          )}
        >
          {/* 해시태그 */}
          <div className="flex flex-wrap gap-2">
            {currentPost.tags?.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="text-xs text-gray-600 dark:text-gray-300"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* 제목과 요약 */}
          <Link href={`/board/${currentPost.category}/${currentPost.id}`}>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 hover:underline">
              {currentPost.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
              {currentPost.summary}
            </p>
          </Link>

          {/* 작성자 정보 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">
                  {currentPost.nickname?.[0] || "U"}
                </span>
              </div>
              <div className="text-gray-900 dark:text-white">
                <div className="text-sm font-semibold">
                  {currentPost.nickname || "익명"}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-300">
                  {currentPost.category} | 조회수{" "}
                  {formatNumberCompact(currentPost.view_count)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 데스크톱: 왼쪽 콘텐츠 + 오른쪽 이미지 */}
      <div className="hidden sm:block relative h-64">
        {/* 왼쪽 콘텐츠 영역 - 이미지 유무에 따라 너비 조정 */}
        <div
          className={cn(
            "absolute left-0 top-0 h-full z-10 flex flex-col justify-between p-6",
            hasImage ? "w-2/3" : "w-full",
          )}
        >
          {/* 상단: 해시태그 */}
          <div className="flex flex-wrap gap-2">
            {currentPost.tags?.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="text-xs text-gray-600 dark:text-gray-300"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* 중앙: 제목과 요약 */}
          <div className="flex-1 flex flex-col justify-center">
            <Link href={`/board/${currentPost.category}/${currentPost.id}`}>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 hover:underline">
                {currentPost.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                {currentPost.summary}
              </p>
            </Link>
          </div>

          {/* 하단: 작성자 정보 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-sm text-white font-bold">
                  {currentPost.nickname?.[0] || "U"}
                </span>
              </div>
              <div className="text-gray-900 dark:text-white">
                <div className="text-base font-semibold">
                  {currentPost.nickname || "익명"}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {currentPost.category} | 조회수{" "}
                  {formatNumberCompact(currentPost.view_count)}
                </div>
              </div>
            </div>

            {/* 컨트롤 버튼 */}
          </div>
        </div>

        {/* 오른쪽 이미지 영역 - 이미지가 있을 때만 표시 */}
        {
          <div className="absolute right-0 top-0 w-1/3 h-full">
            <Image
              src={"/images/mascot/new_logo.webp"}
              alt={"banner"}
              className="w-full h-full object-cover"
              fill
            />
            <div className="absolute inset-0 bg-gradient-to-l from-gray-100/20 dark:from-black/20 to-transparent" />
          </div>
        }
      </div>

      {/* 인디케이터 */}
      {data.length > 1 && (
        <div className=" py-2 z-20">
          <div className="flex items-center justify-between px-6">
            {/* 인디케이터 - 중앙 */}
            <div className="flex-1" />
            <div className="flex items-center gap-2">
              {data.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors",
                    index === currentIndex
                      ? "bg-gray-700 dark:bg-white"
                      : "bg-gray-400 dark:bg-white/50 hover:bg-gray-500 dark:hover:bg-white/75",
                  )}
                />
              ))}
            </div>

            {/* 재생/정지 버튼 - 오른쪽 */}
            <div className="flex-1 flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={togglePlayPause}
                className="text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20"
              >
                {isPaused ? (
                  <Play className="w-4 h-4" />
                ) : (
                  <Pause className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
