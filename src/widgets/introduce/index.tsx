"use client";

import { Separator } from "@/shared/shadcn/ui/separator";
import type { Tables } from "@/shared/types";
import CTASection from "./ui/cta-section";
import FeatureSection from "./ui/feature-section";
import IntroHeader from "./ui/intro-header";
import StatsSection from "./ui/stats-section";

const INTRODUCE_DATA = {
  story: {
    title: "0RIGIN(제로리진) 커뮤니티",
    description:
      "0RIGIN(제로리진)은 일상의 고민과 사회적 이슈를 자유로운 질문과 건강한 토론을 통해 생각을 공유합니다. 자유롭게 말하고, 귀 기울이며, 서로를 연결합니다.",
    image: "/images/mascot/logo.webp",
  },
  features: [
    { title: "철학", description: "깊이 있는 사고와 토론", icon: "🤔" },
    { title: "기술", description: "최신 기술 트렌드와 개발", icon: "💻" },
    { title: "과학", description: "과학적 탐구와 발견", icon: "🔬" },
    { title: "수학", description: "논리적 사고와 추론", icon: "📐" },
  ],
  stats: {
    title: "통계",
    description: "숫자로 보는 0RIGIN",
  },
};

interface IntroduceProps {
  chartStats: Tables<"daily_stats">[];
}

export default function Introduce({ chartStats }: IntroduceProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* 헤더 섹션 */}
        <IntroHeader
          title={INTRODUCE_DATA.story.title}
          description={INTRODUCE_DATA.story.description}
          image={INTRODUCE_DATA.story.image}
        />

        <Separator className="my-16" />

        {/* 특징 섹션 */}
        <FeatureSection features={INTRODUCE_DATA.features} />

        <Separator className="my-16" />

        {/* 통계 섹션 */}
        <StatsSection
          title={INTRODUCE_DATA.stats.title}
          chartStats={chartStats}
        />

        <Separator className="my-16" />

        {/* CTA 섹션 */}
        <CTASection />
      </div>
    </div>
  );
}
