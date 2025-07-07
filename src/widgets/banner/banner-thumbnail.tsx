import type { Post } from '@/entities/post'
import { Badge } from '@/shared/shadcn/ui/badge'
import Link from 'next/link'
import { memo } from 'react'

const DEFAULT_VALUES = {
   id: '/',
   title: '제목',
   summary: '요약',
   nickname: '닉네임',
   thumbnail: '/images/mascot/new_logo.webp',
} as const

function BannerThumbnail({ postData }: { postData?: Post }) {
   const { id, title, summary, thumbnail, nickname, category } = postData
   const DEFAULT_IMAGE = thumbnail || DEFAULT_VALUES.thumbnail

   return (
      <article
         className="w-full h-full transition-all duration-300 relative "
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
            <figure className="w-full h-full m-0">
               <img
                  alt={title}
                  src={DEFAULT_IMAGE}
                  className="w-full h-full object-contain object-center"
               />
               <figcaption
                  className="absolute h-28 bottom-0 w-full bg-gradient-to-t from-black/80 
               via-black/40 to-black/0 pt-5 p-4  z-20  text-white "
               >
                  <header>
                     <h2 className="text-2xl font-bold line-clamp-1 max-w-prose drop-shadow">
                        {title}
                     </h2>
                  </header>
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
