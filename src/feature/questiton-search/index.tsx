"use client";

import { usePhilosopherSearch } from "./hooks/use-philosopher-search";
import PhilosopherCarousel from "./ui/philosopher-carousel";
import SearchInput from "./ui/search-input";

// 카테고리 ID를 표시명으로 변환

const categoryMap = {
  philosophy: "철학",
  science: "과학",
  technology: "기술",
  mathematics: "수학",
};
export default function QuestionSearch() {
  const { form, results, mutation } = usePhilosopherSearch();

  return (
    <section className="w-full px-2">
      <div className="flex flex-col">
        {results && results.length > 0 ? (
          <PhilosopherCarousel
            results={results}
            category={
              categoryMap[form.watch("category") as keyof typeof categoryMap] ||
              "철학"
            }
          />
        ) : (
          <div className="text-center flex flex-col items-center gap-4 sm:gap-8  pt-6 sm:pt-10 ">
            <h2 className="sm:text-5xl text-2xl font-bold ">
              위대한 사상가들에게 물어보세요
            </h2>
            <p className="sm:text-xl text-xs text-muted-foreground">
              역사상 가장 영향력 있는 철학자와 사상가들의 답변을 받아보세요
            </p>
          </div>
        )}

        <div className="max-w-4xl w-full mx-auto py-4 sm:py-8 ">
          <SearchInput
            form={form}
            onSubmit={mutation.mutate}
            isLoading={mutation.isPending}
          />
        </div>
      </div>
    </section>
  );
}
