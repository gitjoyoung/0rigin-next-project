import { Badge } from '@/shared/shadcn/ui/badge'
import { cn } from '@/shared/utils/cn'
import Link from 'next/link'
import { memo } from 'react'

interface PostData {
   id: string
   title: string
   summary: string
   thumbnail?: string
   nickname: string
}

const DEFAULT_VALUES = {
   id: '/',
   title: '제목',
   summary: '요약',
   nickname: '닉네임',
   thumbnail: '/images/mascot/new_logo.webp',
} as const

function BannerThumbnail({ postData }: { postData?: PostData }) {
   const { id, title, summary, thumbnail, nickname } = postData
   const DEFAULT_IMAGE = thumbnail || DEFAULT_VALUES.thumbnail

   return (
      <article
         className={cn(
            'w-full md:w-7/12 md:border-r border-black',
            'transition-all duration-300',
            'relative h-56 md:h-64',
         )}
         aria-label={title}
      >
         <Link href={`/board/${id}`} className="block h-full relative group">
            <img
               alt={title}
               src={DEFAULT_IMAGE}
               className="w-full h-full object-contain object-center"
            />
            <div className="absolute top-1 right-1">
               <Badge className="text-xs align-middle bg-black/80 px-1 py-1 rounded">
                  {nickname}
               </Badge>
            </div>
            <div className="absolute h-28 bottom-0 w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-5 p-4 text-white z-20">
               <h2 className="text-2xl font-bold line-clamp-1 max-w-prose">
                  {title}
               </h2>
               <p className="break-words text-sm line-clamp-2 max-w-prose mt-1">
                  {summary}
               </p>
            </div>
         </Link>
      </article>
   )
}

export default memo(BannerThumbnail)
