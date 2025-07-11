import { Badge } from '@/shared/shadcn/ui/badge'
import type { Tables } from '@/shared/types'
import { cn } from '@/shared/utils/cn'
import Link from 'next/link'
import { memo } from 'react'

const DEFAULT_VALUES = {
   id: '/',
   title: '제목',
   summary: '요약',
   nickname: '닉네임',
   thumbnail: '/images/mascot/new_logo.webp',
} as const

function BannerThumbnail({
   postData,
   className,
}: {
   postData: Tables<'posts'>
   className?: string
}) {
   const { id, title, summary, thumbnail, nickname, category } = postData

   return (
      <article
         className={cn(
            'w-full h-full transition-all duration-300 relative',
            className,
         )}
         aria-label={title}
      >
         <Link
            href={`/board/${category}/${id}`}
            className="block h-full relative group"
         >
            {nickname && (
               <Badge className="text-xs align-middle px-1 py-1 rounded absolute top-1 right-1">
                  {nickname}
               </Badge>
            )}
            <figure className="w-full h-full ">
               <img
                  alt={title}
                  src={thumbnail || DEFAULT_VALUES.thumbnail}
                  className="w-full h-full object-contain object-center"
               />
               <figcaption
                  className="absolute  bottom-0 w-full bg-gradient-to-t from-black/80 
               via-black/40 to-black/0 sm:p-4 p-2 z-20  text-white "
               >
                  <h2 className="sm:text-2xl text-xl font-bold line-clamp-1 max-w-prose drop-shadow">
                     {title}
                  </h2>
                  <p className="break-words text-sm line-clamp-2 max-w-prose mt-1 drop-shadow">
                     {summary}
                  </p>
               </figcaption>
            </figure>
         </Link>
      </article>
   )
}

export default memo(BannerThumbnail)
