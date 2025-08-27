import { ROUTE_FORGET_PASSWORD } from "@/constants/pathname";
import { Button } from "@/shared/shadcn/ui/button";
import { HelpCircle, KeyRound } from "lucide-react";
import Link from "next/link";

export default function ForgetPassword({ isPending }: { isPending: boolean }) {
  return (
    <div className="my-4 p-4 rounded-lg bg-muted/30 border border-border/50">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="p-2 rounded-full bg-muted-foreground/10">
            <HelpCircle className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-medium text-foreground">
              비밀번호를 잊으셨나요?
            </p>
            <p className="text-xs text-muted-foreground">
              이메일로 재설정 링크를 받아보세요
            </p>
          </div>
        </div>
        <Button
          disabled={isPending}
          variant="outline"
          size="sm"
          className="shrink-0 hover:bg-muted/70 transition-colors"
          asChild
        >
          <Link
            href={ROUTE_FORGET_PASSWORD}
            className="flex items-center gap-2"
          >
            <KeyRound className="h-4 w-4" />
            <span className="hidden sm:inline">비밀번호 재설정</span>
            <span className="sm:hidden">재설정</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
