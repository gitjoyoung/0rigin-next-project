"use client";

import { Dialog, DialogContent, DialogTitle } from "@/shared/shadcn/ui/dialog";
import { Input } from "@/shared/shadcn/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SearchOverlay({ open, onOpenChange }: Props) {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    const searchTrim = searchValue.trim();
    if (!searchTrim) return;
    const processedSearchTerm = searchTrim.replace(/\s+/g, "+");
    router.push(`/search/${processedSearchTerm}`);
    onOpenChange(false);
    setSearchValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      handleSearch();
    }
  };

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setSearchValue("");
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0 max-w-2xl">
        <DialogTitle className="sr-only">검색</DialogTitle>
        <div className="flex flex-col">
          <div className="flex items-center border-b px-4 py-3">
            <Search className="mr-2 h-5 w-5 shrink-0 opacity-50" />
            <Input
              ref={inputRef}
              type="text"
              placeholder="검색어를 입력하세요..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 border-none shadow-none focus-visible:ring-0 text-base h-6 px-0"
              maxLength={50}
            />
          </div>
          <div className="py-6 text-center text-sm text-muted-foreground">
            {searchValue ? (
              <>Enter를 눌러 &quot;{searchValue}&quot; 검색</>
            ) : (
              <div className="flex flex-col gap-2">
                <p>검색어를 입력하세요</p>
                <p className="text-xs">
                  <kbd className="px-2 py-1 bg-muted rounded text-xs">⌘J</kbd>{" "}
                  또는{" "}
                  <kbd className="px-2 py-1 bg-muted rounded text-xs">
                    Ctrl+J
                  </kbd>{" "}
                  로 검색창 열기/닫기
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
