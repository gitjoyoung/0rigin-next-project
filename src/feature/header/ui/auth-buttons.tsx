"use client";

import {
  useAuthActions,
  useAuthState,
} from "@/app/providers/auth-client-provider";
import { ROUTE_LOGIN, ROUTE_MY_PAGE, ROUTE_SIGN } from "@/constants/pathname";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/shadcn/ui/avatar";
import { Button } from "@/shared/shadcn/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/shadcn/ui/dropdown-menu";
import { cn } from "@/shared/utils/cn";
import { LogOut, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function MenuButton(props: React.ComponentProps<typeof Button>) {
  return (
    <Button
      size="sm"
      variant="outline"
      className="dark:bg-white bg-black text-white dark:text-black"
      {...props}
    />
  );
}

export default function AuthButtons() {
  const { status, profile } = useAuthState();
  const { logout } = useAuthActions();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
    setIsLoggingOut(false);
  };

  if (status === "unauth") {
    return (
      <nav className="flex gap-2 text-xs">
        <MenuButton asChild>
          <Link href={ROUTE_LOGIN}>로그인</Link>
        </MenuButton>
        <MenuButton variant="outline" asChild>
          <Link href={ROUTE_SIGN}>회원가입</Link>
        </MenuButton>
      </nav>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center text-xs gap-1 px-2 focus-visible:ring-0 focus-visible:ring-offset-0
          focus:outline-none focus:bg-transparent"
        >
          <Avatar className="w-6 h-6">
            <AvatarImage src={profile?.avatar_url || ""} />
            <AvatarFallback>{profile?.nickname?.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <span className=" font-medium ">{profile?.nickname || ""}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="focus:outline-none px-2 ">
        <DropdownMenuLabel className="text-xs mb-2 text-gray-500 dark:text-gray-400">
          {profile?.email || ""}
        </DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link
            href={ROUTE_MY_PAGE}
            className="flex items-center gap-2 text-xs"
          >
            <User className="h-4 w-4" />
            마이페이지
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          disabled={isLoggingOut}
          className={cn(
            "flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950 focus:outline-none text-xs",
          )}
        >
          <LogOut className="h-4 w-4" />
          {isLoggingOut ? "로그아웃 중..." : "로그아웃"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
