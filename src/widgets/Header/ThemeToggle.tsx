'use client'

import { Label } from '@/shared/shadcn/ui/label'
import { Switch } from '@/shared/shadcn/ui/switch'
import { Icons } from '@/shared/ui/icons'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
   const { theme, setTheme } = useTheme()
   const [mounted, setMounted] = useState(false)

   useEffect(() => {
      setMounted(true)
   }, [])

   if (!mounted) {
      return (
         <div className="flex items-center space-x-2">
            <div className="h-5 w-9 rounded-full bg-gray-200" />
            <div className="h-4 w-4 rounded-full bg-gray-300" />
         </div>
      )
   }

   return (
      <div className="flex items-center space-x-2">
         <Switch
            id="theme-mode"
            checked={theme === 'dark'}
            onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
         />
         <Label htmlFor="theme-mode">
            {theme === 'dark' ? (
               <Icons.moon size={18} />
            ) : (
               <Icons.sun size={18} />
            )}
         </Label>
      </div>
   )
}
