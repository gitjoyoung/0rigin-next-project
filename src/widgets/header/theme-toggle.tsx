'use client'

import { Icons } from '@/shared/ui/icons'
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
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="cursor-pointer transition-all duration-300"
         >
            {theme === 'dark' ? (
               <Icons.moon size={18} className="animate-rotate-fade-in" />
            ) : (
               <Icons.sun size={18} className="animate-rotate-fade-in" />
            )}
         </button>
      </div>
   )
}
