import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'
import { cn } from '../../shared/utils/cn'

interface UtilHeaderProps {
   icon: React.ReactNode
   name: string
   description?: string
   className?: string
   backHref?: string
}

export function UtilHeader({
   icon,
   name,
   description,
   className,
   backHref = '/utils',
}: UtilHeaderProps) {
   return (
      <header
         className={cn(
            'relative w-full bg-gradient-to-b  shadow-sm rounded-none px-3 py-2 md:py-4  min-h-[56px] md:min-h-[72px]',
            className,
         )}
      >
         <div className="flex flex-row items-center gap-2  w-full ">
            {backHref && (
               <Link
                  href={backHref}
                  className="flex items-center justify-center rounded-full hover:bg-gray-200 active:bg-gray-300 transition p-1 md:p-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  aria-label="뒤로가기"
                  tabIndex={0}
               >
                  <ArrowLeft className="w-7 h-7 md:w-8 md:h-8 text-gray-500" />
               </Link>
            )}
            <span className="flex items-center gap-2 ">
               <span className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-gray-700 dark:text-gray-300">
                  {icon}
               </span>
               <span className="text-lg md:text-2xl font-bold text-gray-800 dark:text-gray-200 truncate max-w-[60vw] md:max-w-[30vw]">
                  {name}
               </span>
            </span>
         </div>
         {description && (
            <div className="w-full mt-2 text-xs md:text-sm text-gray-500 whitespace-pre-line break-words leading-relaxed ">
               {description}
            </div>
         )}
      </header>
   )
}
