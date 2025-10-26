"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const handleThemeToggle = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <button
      aria-label="dark mode toggle"
      onClick={handleThemeToggle}
      className="flex items-center justify-center w-8 h-8 rounded transition-all duration-300 cursor-pointer"
      suppressHydrationWarning
    >
      <Moon
        size={18}
        className="hidden dark:block animate-rotate-fade-in"
        aria-hidden
      />
      <Sun
        size={18}
        className="block dark:hidden animate-rotate-fade-in"
        aria-hidden
      />
    </button>
  );
}
