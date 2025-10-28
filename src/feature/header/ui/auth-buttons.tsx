"use client";

import {
  useAuthActions,
  useAuthState,
} from "@/app/providers/auth-client-provider";
import { ROUTE_LOGIN, getProfileRoute } from "@/constants/pathname";
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
import { LogOut, User, User2Icon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function MenuButton(props: React.ComponentProps<typeof Button>) {
  return (
    <Button
      size="sm"
      variant="outline"
      className="bg-black text-white hover:bg-gray-800 hover:text-white border-gray-700"
      {...props}
    />
  );
}

export default function AuthButtons() {
  const { status, profile, user } = useAuthState();
  const { logout } = useAuthActions();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
    setIsLoggingOut(false);
  };

  if (status === "unauth") {
    return (
      <nav className="flex text-xs items-center">
        <Link href={ROUTE_LOGIN}>
          <User2Icon size={18} />
        </Link>
      </nav>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "text-white bg-transparent",
            "hover:bg-gray-800 hover:text-white",
            "flex items-center text-xs gap-1 px-2 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none",
          )}
        >
          <Avatar className="w-7 h-7 rounded-sm">
            <AvatarImage src={profile?.avatar_url || ""} />
            <AvatarFallback className="text-black bg-white">
              {profile?.nickname?.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium">{profile?.nickname || ""}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="focus:outline-none px-2">
        <DropdownMenuLabel className="text-xs mb-2 text-gray-500">
          {profile?.email || ""}
        </DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link
            href={user?.id ? getProfileRoute(user.id) : "/"}
            className="flex items-center gap-2 text-xs"
          >
            <User className="h-4 w-4" />내 프로필
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 focus:outline-none text-xs"
        >
          <LogOut className="h-4 w-4" />
          {isLoggingOut ? "로그아웃 중..." : "로그아웃"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
