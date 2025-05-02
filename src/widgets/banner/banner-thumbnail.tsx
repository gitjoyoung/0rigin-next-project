import Image from 'next/image'
import Link from 'next/link'
import { memo } from 'react'

interface Props {
   postData: any
}

function BannerThumbnail({ postData }: Props) {
   const {
      id = '/',
      title = '제목',
      summary = '요약',
      thumbnail,
      nickname = '닉네임',
   } = postData

   console.log('BannerThumbnail rerender')
   return (
      <div className=" w-full md:w-7/12 md:border-r border-black ">
         <div className="relative w-full h-56">
            <div className="absolute top-0 bg-black text-white text-sm right-0 p-1">
               <p>{nickname}</p>
            </div>
            <Link href={`/board/${id}`}>
               <Image
                  alt="배너 섬네일"
                  src={thumbnail || '/mascot/winksaurus.png'}
                  fill
                  priority
                  quality={85}
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
               />
               <div className="absolute h-28 bottom-0 w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-5 p-4 text-white">
                  <h1 className="text-2xl font-bold line-clamp-1 max-w-prose">
                     {title}
                  </h1>
                  <p className="break-words text-sm line-clamp-2 max-w-prose">
                     {summary}
                  </p>
               </div>
            </Link>
         </div>
      </div>
   )
}

export default memo(BannerThumbnail)
