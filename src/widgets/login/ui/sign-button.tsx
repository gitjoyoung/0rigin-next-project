import { ROUTE_SIGN } from "@/constants/pathname";
import { Button } from "@/shared/shadcn/ui/button";
import { ArrowRight, UserPlus } from "lucide-react";
import Link from "next/link";

export default function SignButton() {
  return (
    <div className="w-full max-w-md">
      <div className="text-center space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <UserPlus className="h-4 w-4" />
            <span className="text-sm font-medium">아직 계정이 없으신가요?</span>
          </div>
          <p className="text-xs text-muted-foreground/80">
            지금 가입하고 다양한 서비스를 이용해보세요
          </p>
        </div>

        <Button
          variant="outline"
          className="w-full group hover:bg-gray-50 dark:hover:bg-gray-800/50 border-gray-200 dark:border-gray-700 transition-all duration-200"
          asChild
        >
          <Link
            href={ROUTE_SIGN}
            className="flex items-center justify-center gap-2"
          >
            <span className="font-medium">회원가입</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
