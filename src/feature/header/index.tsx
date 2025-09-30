"use client";

import Logo from "@/shared/ui/logo";
import { Search } from "lucide-react";
import AuthButtons from "./ui/auth-buttons";
import MobileSideMenu from "./ui/mobile-side-menu";
import Navigation from "./ui/navigation";
import ThemeToggle from "./ui/theme-toggle";

export default function Header() {
  return (
    <header className="w-full dark:bg-white bg-black dark:text-black text-white">
      <div className="flex items-center justify-between w-full max-w-[1280px] mx-auto px-auto">
        <nav className="flex gap-4 items-center justify-end">
          <Logo />
          <Navigation />
        </nav>
        <div className="flex items-center gap-2 ">
          <button
            type="button"
            onClick={() => {
              console.log("search");
            }}
          >
            <Search size={16} />
          </button>
          <ThemeToggle />
          <MobileSideMenu className="sm:hidden" />
          <div className="hidden sm:block">
            <AuthButtons />
          </div>
        </div>
      </div>
    </header>
  );
}
