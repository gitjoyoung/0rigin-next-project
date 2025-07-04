import { cn } from '@/shared/utils/cn'
import Link from 'next/link'
import { memo, useMemo } from 'react'

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
   const { id, title, summary, thumbnail, nickname } =
      postData || DEFAULT_VALUES

   const imageAlt = useMemo(
      () => `${title} - ${nickname}의 게시물`,
      [title, nickname],
   )

   const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
      console.log('이미지 로드 오류:', e)
      const target = e.target as HTMLImageElement
      target.src = DEFAULT_VALUES.thumbnail
   }

   return (
      <div
         className={cn(
            'w-full md:w-7/12 md:border-r border-black',
            'transition-all duration-300',
            'relative h-56 md:h-64',
         )}
         role="article"
         aria-label={title}
      >
         <div className="relative w-full h-full group">
            {nickname && (
               <div
                  className="absolute top-0 bg-black/80 text-white text-sm right-0 p-1.5 z-20"
                  role="complementary"
                  aria-label="작성자 정보"
               >
                  <p>{nickname}</p>
               </div>
            )}
            <Link
               href={`/board/${id}`}
               className="block h-full relative before:absolute before:inset-0 before:bg-black/30 before:z-10 before:transition-opacity before:duration-300 group-hover:before:opacity-0"
               aria-label={`${title} 게시물로 이동`}
            >
               <img
                  alt={imageAlt}
                  src={thumbnail || DEFAULT_VALUES.thumbnail}
                  className="w-full h-full object-contain object-center"
                  onError={handleImageError}
               />
               <div
                  className="absolute h-28 bottom-0 w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-5 p-4 text-white z-20"
                  role="contentinfo"
               >
                  <h2 className="text-2xl font-bold line-clamp-1 max-w-prose">
                     {title}
                  </h2>
                  <p className="break-words text-sm line-clamp-2 max-w-prose mt-1">
                     {summary}
                  </p>
               </div>
            </Link>
         </div>
      </div>
   )
}

export default memo(BannerThumbnail)
