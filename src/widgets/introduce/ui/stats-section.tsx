import type { Tables } from "@/shared/types";
import StatsChart from "./stats-chart";

interface StatsSectionProps {
  title: string;
  chartStats: Tables<"daily_stats">[];
}

export default function StatsSection({ title, chartStats }: StatsSectionProps) {
  return (
    <>
      <div className="text-center mb-4">
        <h2 className="text-lg sm:text-2xl font-semibold">{title}</h2>
      </div>
      <StatsChart chartStats={chartStats} />
    </>
  );
}
