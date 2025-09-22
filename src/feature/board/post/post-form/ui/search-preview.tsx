import type { BoardFormType } from "@/feature/board/common/schema";
import {
  extractFirstImageUrl,
  removeImagesAndMarkdown,
} from "@/feature/board/common/utils/markdown-util";
import type { UseFormReturn } from "react-hook-form";

export default function SearchPreview({
  form,
}: {
  form: UseFormReturn<BoardFormType>;
}) {
  return (
    <div className="flex items-center gap-4 w-full max-w-[500px] bg-white dark:bg-neutral-900 border rounded-lg shadow-sm p-3 my-2">
      {/* 썸네일 (오른쪽, 75x75) - 이미지가 있을 때만 */}
      <div className="flex flex-1 min-w-0 flex-col">
        <div className="font-bold text-base sm:text-lg text-gray-900 dark:text-white truncate mb-1">
          {(form.watch("title") || "제목 미리보기").slice(0, 30)}
        </div>
        <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-300 line-clamp-4 break-words">
          {(
            removeImagesAndMarkdown(form.watch("content")) || "내용 미리보기"
          ).slice(0, 80)}
        </div>
      </div>
      {extractFirstImageUrl(form.watch("content")) && (
        <div className="flex-shrink-0 w-[75px] h-[75px] rounded overflow-hidden bg-gray-100 border flex items-center justify-center ml-2">
          <img
            src={extractFirstImageUrl(form.watch("content"))}
            alt="썸네일 미리보기"
            className="object-cover w-full h-full"
          />
        </div>
      )}
    </div>
  );
}
