import { getDailyStats } from "@/entities/stats";
import { cn } from "@/shared/utils/cn";
import TickerList from "./ui/ticker-list";

export default async function Ticker() {
  const statsData = await getDailyStats();
  return (
    <aside
      className={cn(
        "relative bg-transparent text-black dark:text-white text-xs w-full h-[16px] border-b",
      )}
    >
      <div className=" absolute right-0 flex items-center">
        <TickerList statsData={statsData ?? null} />
      </div>
    </aside>
  );
}
