"use client";
import Logo from "@/shared/ui/logo";
import SearchBox from "../search-box";
import AuthButtons from "./ui/auth-buttons";
import MobileSideMenu from "./ui/mobile-side-menu";
import Navigation from "./ui/navigation";
import ThemeToggle from "./ui/theme-toggle";

export default function Header() {
  return (
    <header className="flex items-center justify-between w-full border-t  ">
      <nav className="flex gap-4 items-center justify-end">
        <Logo />
        <Navigation />
      </nav>
      <div className="flex items-center gap-2 ">
        <SearchBox />
        <ThemeToggle />
        <MobileSideMenu className="sm:hidden" />
        <div className="hidden sm:block">
          <AuthButtons />
        </div>
      </div>
    </header>
  );
}
