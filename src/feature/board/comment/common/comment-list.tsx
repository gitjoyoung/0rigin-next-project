import { Button } from "@/shared/shadcn/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/shared/shadcn/ui/pagination";
import type { Tables } from "@/shared/types";
import { useState } from "react";
import CommentItem from "./comment-item";

interface Props {
  commentsData: Tables<"comments">[];
  refetch: () => void;
}

const COMMENTS_PER_PAGE = 30;

export default function CommentList({ commentsData, refetch }: Props) {
  const [isSelected, setIsSelected] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSelect = (id: number) => {
    setIsSelected(id);
  };

  const totalPages = Math.ceil(commentsData.length / COMMENTS_PER_PAGE);
  const startIndex = (currentPage - 1) * COMMENTS_PER_PAGE;
  const endIndex = startIndex + COMMENTS_PER_PAGE;
  const displayedComments = commentsData.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col">
      {displayedComments.map((data) => (
        <div
          key={data.id}
          className="border-b border-gray-200 dark:border-gray-700 last:border-b-0"
        >
          <CommentItem
            commentData={data}
            refetch={refetch}
            isSelected={isSelected}
            onSelect={handleSelect}
          />
        </div>
      ))}

      {totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage <= 1}
                  className="gap-1 pl-2.5"
                >
                  이전
                </Button>
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <PaginationItem key={page}>
                    <Button
                      variant={page === currentPage ? "outline" : "ghost"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                      className="w-9 h-9"
                    >
                      {page}
                    </Button>
                  </PaginationItem>
                ),
              )}

              <PaginationItem>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                  className="gap-1 pr-2.5"
                >
                  다음
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
