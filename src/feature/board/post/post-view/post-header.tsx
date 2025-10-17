import type { Database } from "@/shared/types";
import ClientDayHydration from "@/shared/ui/hydrated-date";
import { formatNumberCompact } from "@/shared/utils/format-number";
import PostActionButtons from "../post-action-button";

export default function PostHeader(
  Props: Partial<Database["public"]["Tables"]["posts"]["Row"]> & {
    likeCount: number;
  },
) {
  const {
    title,
    nickname,
    created_at,
    view_count,
    id,
    category,
    author_id,
    likeCount,
  } = Props;

  return (
    <div className=" border-b ">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl">{title}</h1>
        <ul className="flex gap-1 text-xs items-center text-gray-700 dark:text-gray-400 min-w-0 justify-between">
          <li className="flex items-center gap-1 min-w-0 flex-shrink font-bold  max-w-[120px] truncate">
            {nickname || "익명"}
          </li>
          <ClientDayHydration date={created_at || ""} />
        </ul>
      </div>

      <div className="flex text-xs items-center justify-between text-gray-700 dark:text-gray-400 min-w-0">
        <ul className="flex gap-2 items-center">
          <li className="flex min-w-0 flex-shrink ">
            추천 {formatNumberCompact(likeCount)}
          </li>
          <li className="flex min-w-0 flex-shrink ">
            조회 {formatNumberCompact(view_count)}
          </li>
        </ul>
        <PostActionButtons
          post={{
            postId: id?.toString() || "",
            category: category || "",
            nickname: nickname || "",
            author_id: author_id || undefined,
          }}
        />
      </div>
    </div>
  );
}
