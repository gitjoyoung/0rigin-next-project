'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function ThemeToggle() {
   const { resolvedTheme, setTheme } = useTheme()

   return (
      <button
         aria-label="다크모드 토글"
         onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
         className="cursor-pointer transition-all duration-300"
      >
         {resolvedTheme === 'dark' ? (
            <Moon size={18} className="animate-rotate-fade-in" />
         ) : (
            <Sun size={18} className="animate-rotate-fade-in" />
         )}
      </button>
   )
}
