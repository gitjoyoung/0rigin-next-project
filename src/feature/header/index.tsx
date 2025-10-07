"use client";

import Logo from "@/shared/ui/logo";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import AuthButtons from "./ui/auth-buttons";
import MobileSideMenu from "./ui/mobile-side-menu";
import Navigation from "./ui/navigation";
import SearchOverlay from "./ui/search-overlay";
import ThemeToggle from "./ui/theme-toggle";

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="w-full dark:bg-white bg-black dark:text-black text-white">
        <div className="flex items-center justify-between w-full max-w-[1280px] mx-auto px-auto">
          <nav className="flex gap-4 items-center justify-end">
            <Logo />
            <Navigation />
          </nav>
          <div className="flex items-center gap-2 ">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="검색"
              title="검색 (⌘J / Ctrl+J)"
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
      <SearchOverlay open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </>
  );
}
