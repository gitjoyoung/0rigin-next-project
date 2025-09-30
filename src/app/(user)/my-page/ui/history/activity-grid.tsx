"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/shadcn/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/shadcn/ui/tooltip";
import { useState } from "react";

interface ActivityGridProps {
  className?: string;
}

export default function ActivityGrid({ className }: ActivityGridProps) {
  const [selectedYear, setSelectedYear] = useState<string>(
    new Date().getFullYear().toString(),
  );

  // 활동 기록 생성 (고정된 더미 데이터 - SSR 호환)
  const generateActivityData = (year: number) => {
    const activities = [];
    // 고정된 시드를 사용하여 일관된 데이터 생성
    const fixedPattern = [
      0, 1, 0, 0, 2, 3, 0, 1, 0, 4, 1, 0, 2, 0, 0, 1, 3, 0, 2, 1, 0, 0, 1, 0, 3,
      0, 2, 4, 0, 0, 3,
    ];

    // 선택된 년도의 1월 1일부터 시작
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);
    const totalDays =
      Math.ceil(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
      ) + 1;

    for (let i = 0; i < totalDays; i++) {
      const patternIndex = (i + year) % fixedPattern.length; // 년도별로 다른 패턴
      const activityCount = fixedPattern[patternIndex];

      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      activities.push({
        date: date.toISOString().split("T")[0],
        count: activityCount,
      });
    }
    return activities;
  };

  const activityData = generateActivityData(parseInt(selectedYear));

  // 년도 목록 생성 (현재 년도부터 과거 5년)
  const currentYear = new Date().getFullYear();
  const availableYears = Array.from({ length: 6 }, (_, i) => currentYear - i);

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    };
    return date.toLocaleDateString("ko-KR", options);
  };

  // 활동 강도에 따른 색상 반환 (다크모드 대응)
  const getActivityColor = (count: number) => {
    if (count === 0) return "bg-gray-100 dark:bg-gray-700";
    if (count === 1) return "bg-green-200 dark:bg-green-800";
    if (count === 2) return "bg-green-300 dark:bg-green-700";
    if (count >= 3) return "bg-green-500 dark:bg-green-600";
    return "bg-gray-100 dark:bg-gray-700";
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-4 ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          활동 기록
        </h2>
        <div className="flex items-center space-x-4">
          {/* 년도 선택 */}
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-20 h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {availableYears.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* 색상 범례 */}
          <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
            <span>Less</span>
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-gray-100 dark:bg-gray-700 rounded-sm"></div>
              <div className="w-3 h-3 bg-green-200 dark:bg-green-800 rounded-sm"></div>
              <div className="w-3 h-3 bg-green-300 dark:bg-green-700 rounded-sm"></div>
              <div className="w-3 h-3 bg-green-500 dark:bg-green-600 rounded-sm"></div>
            </div>
            <span>More</span>
          </div>
        </div>
      </div>

      {/* 활동 그리드 (깃허브 스타일) */}
      <TooltipProvider>
        <div className="overflow-x-auto">
          <div className="inline-block min-w-[700px]">
            {/* 월 라벨 */}
            <div className="flex text-xs text-gray-500 dark:text-gray-400 mb-2 ml-8">
              {[
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ].map((month, index) => (
                <div key={month} className="w-[44px] text-left">
                  {month}
                </div>
              ))}
            </div>

            {/* 요일별 그리드 */}
            <div className="flex">
              {/* 요일 라벨 */}
              <div className="flex flex-col text-xs text-gray-500 dark:text-gray-400 mr-2 justify-between h-[91px]">
                <div></div>
                <div>Mon</div>
                <div></div>
                <div>Wed</div>
                <div></div>
                <div>Fri</div>
                <div></div>
              </div>

              {/* 활동 박스들 - 정확한 달력 형태 */}
              <div className="grid grid-rows-7 grid-flow-col gap-1">
                {(() => {
                  const startDate = new Date(parseInt(selectedYear), 0, 1);
                  const startDayOfWeek = startDate.getDay(); // 0 = 일요일
                  const boxes = [];

                  // 총 53주 * 7일 = 371개 박스 생성
                  for (let week = 0; week < 53; week++) {
                    for (let day = 0; day < 7; day++) {
                      const dayIndex = week * 7 + day - startDayOfWeek;
                      const activity = activityData[dayIndex];

                      if (!activity || dayIndex < 0) {
                        boxes.push(
                          <div
                            key={`${week}-${day}`}
                            className="w-3 h-3 rounded-sm bg-gray-50 dark:bg-gray-800"
                          />,
                        );
                      } else {
                        boxes.push(
                          <Tooltip key={`${week}-${day}`}>
                            <TooltipTrigger asChild>
                              <div
                                className={`w-3 h-3 rounded-sm ${getActivityColor(activity.count)} hover:ring-2 hover:ring-blue-300 cursor-pointer transition-all`}
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="text-center">
                                <div className="font-medium">
                                  {formatDate(activity.date)}
                                </div>
                                <div className="text-xs opacity-75">
                                  {activity.count === 0
                                    ? "활동 없음"
                                    : `${activity.count}회 활동`}
                                </div>
                              </div>
                            </TooltipContent>
                          </Tooltip>,
                        );
                      }
                    }
                  }
                  return boxes;
                })()}
              </div>
            </div>
          </div>
        </div>
      </TooltipProvider>

      <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        {selectedYear}년 활동 기록 • 총{" "}
        {activityData.reduce((sum, day) => sum + day.count, 0)}회 활동
      </div>
    </div>
  );
}
