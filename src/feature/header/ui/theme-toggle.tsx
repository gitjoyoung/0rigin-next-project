"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      aria-label="dark mode toggle"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="flex items-center justify-center w-8 h-8 rounded transition-all duration-300 cursor-pointer"
    >
      {mounted &&
        (resolvedTheme === "dark" ? (
          <Moon size={18} className="animate-rotate-fade-in" />
        ) : (
          <Sun size={18} className="animate-rotate-fade-in" />
        ))}
    </button>
  );
}
