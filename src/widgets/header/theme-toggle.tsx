'use client'

import { Label } from '@/shared/shadcn/ui/label'
import { Switch } from '@/shared/shadcn/ui/switch'
import { Icons } from '@/shared/ui/icons'
import { useTheme } from 'next-themes'

export default function ThemeToggle() {
   const { theme, setTheme } = useTheme()

   return (
      <div className="flex items-center ">
         <Switch
            id="theme-mode"
            className="hidden"
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
