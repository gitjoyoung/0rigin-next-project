'use client'

import { cn } from '@/shared/utils/cn'
import { Upload } from 'lucide-react'
import Image from 'next/image'
import { useRef } from 'react'

interface ThumbnailUploadProps {
   thumbnailUrl: string
   uploading: boolean
   onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
   className?: string
   size?: 'sm' | 'md' | 'lg'
   showPreview?: boolean
   accept?: string
   disabled?: boolean
}

export default function ThumbnailUpload({
   thumbnailUrl,
   uploading,
   onImageUpload,
   className,
   size = 'md',
   showPreview = true,
   accept = 'image/*',
   disabled = false,
}: ThumbnailUploadProps) {
   const fileInputRef = useRef<HTMLInputElement>(null)

   const sizeClasses = {
      sm: 'w-12 h-12',
      md: 'w-[75px] h-[75px]',
      lg: 'w-24 h-24',
   }

   const iconSizes = {
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-8 h-8',
   }

   const handleClick = () => {
      if (!disabled && !uploading) {
         fileInputRef.current?.click()
      }
   }

   return (
      <div
         className={cn(
            'relative group flex-shrink-0',
            sizeClasses[size],
            disabled && 'opacity-50 cursor-not-allowed',
            className,
         )}
      >
         {showPreview && thumbnailUrl ? (
            <Image
               src={thumbnailUrl}
               alt="thumbnail"
               fill
               sizes={size === 'sm' ? '48px' : size === 'md' ? '75px' : '96px'}
               className="rounded-md object-cover"
            />
         ) : (
            <div className="w-full h-full bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
               <Upload className={cn('text-gray-400', iconSizes[size])} />
            </div>
         )}

         <div
            className={cn(
               `absolute inset-0 flex items-center justify-center rounded-md transition-opacity duration-200 ${
                  disabled
                     ? 'cursor-not-allowed opacity-0'
                     : uploading
                       ? 'opacity-100 bg-black/30 cursor-wait'
                       : thumbnailUrl
                         ? 'opacity-0 group-hover:opacity-100 group-hover:bg-black/30 cursor-pointer'
                         : 'opacity-100 bg-black/10 hover:bg-black/20 cursor-pointer'
               }`,
            )}
            onClick={handleClick}
         >
            {uploading ? (
               <div
                  className={cn(
                     'border-2 border-slate-100 border-t-transparent rounded-full animate-spin',
                     iconSizes[size],
                  )}
               />
            ) : (
               <Upload className={cn('text-slate-100', iconSizes[size])} />
            )}
         </div>

         <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            className="hidden"
            onChange={onImageUpload}
            disabled={uploading || disabled}
         />
      </div>
   )
}
