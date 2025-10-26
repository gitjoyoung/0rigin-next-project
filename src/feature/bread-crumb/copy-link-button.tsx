"use client";

import { toast } from "@/shared/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/shadcn/ui/tooltip";
import { Copy } from "lucide-react";

interface CopyLinkButtonProps {
  url: string;
}

export function CopyLinkButton({ url }: CopyLinkButtonProps) {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    toast({
      variant: "default",
      title: "링크가 복사되었습니다.",
    });
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={handleCopyLink}
          className="p-0 border-0 bg-transparent cursor-pointer inline-flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          aria-label="링크 복사"
        >
          <Copy className="w-3.5 h-3.5" />
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>링크 복사</p>
      </TooltipContent>
    </Tooltip>
  );
}
