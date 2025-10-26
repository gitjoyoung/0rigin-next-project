"use client";

import { formatSmartDate } from "@/shared/utils/dayjs-config";
import { useEffect, useState } from "react";

export default function HydratedDate({ date }: { date?: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <>{date?.slice(0, 10)}</>;
  return <>{formatSmartDate(date || "")}</>;
}
