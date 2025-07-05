'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
   const [mounted, setMounted] = useState(false)
   const { theme, setTheme } = useTheme()

   useEffect(() => {
      setMounted(true)
   }, [])

   if (!mounted) {
      return null
   }

   return (
      <div className="flex items-center">
         <button
            aria-label="다크모드 토글"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="cursor-pointer transition-all duration-300"
         >
            {theme === 'dark' ? (
               <Moon size={18} className="animate-rotate-fade-in" />
            ) : (
               <Sun size={18} className="animate-rotate-fade-in" />
            )}
         </button>
      </div>
   )
}
