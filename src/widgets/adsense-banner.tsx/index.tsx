'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

type BackgroundType = 'image' | 'video'

// 개발 단계에서 배경 타입을 쉽게 변경할 수 있는 상수
const BACKGROUND_TYPE: BackgroundType = 'video'
const IMAGE_SRC = '/images/banner/compressed_newYear.webp'
const VIDEO_SRC = '/videos/sample-video.mp4'
const ALT_TEXT = '지수랑 첫해'

// 배너 텍스트 상수
const BANNER_TITLE = '0rigin에 오신 것을 환영합니다!'
const BANNER_DESCRIPTION =
   '여러분의 일상을 더 특별하게 만들어드릴 0rigin과 함께하세요. 지금 바로 시작해보세요!'

export default function AdSenseBanner() {
   const [showPlayButton, setShowPlayButton] = useState(false)
   const videoRef = useRef<HTMLVideoElement>(null)

   useEffect(() => {
      const video = videoRef.current
      if (!video) return

      const handlePlay = () => setShowPlayButton(false)
      const handlePause = () => setShowPlayButton(true)

      video.addEventListener('play', handlePlay)
      video.addEventListener('pause', handlePause)

      // 자동 재생 시도
      const playPromise = video.play()
      if (playPromise !== undefined) {
         playPromise.catch(() => {
            setShowPlayButton(true)
         })
      }

      return () => {
         video.removeEventListener('play', handlePlay)
         video.removeEventListener('pause', handlePause)
      }
   }, [])

   const handlePlayVideo = async () => {
      try {
         if (videoRef.current) {
            await videoRef.current.play()
         }
      } catch (error) {
         console.error('비디오 재생 실패:', error)
      }
   }

   return (
      <div className="relative w-full h-[250px]">
         {BACKGROUND_TYPE === 'image' ? (
            <Image
               src={IMAGE_SRC}
               alt={ALT_TEXT}
               fill
               sizes="100vw"
               className="object-cover"
               priority
            />
         ) : (
            <div className="relative w-full h-full">
               <video
                  ref={videoRef}
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
               >
                  <source src={VIDEO_SRC} type="video/mp4" />
               </video>
               {showPlayButton && (
                  <button
                     onClick={handlePlayVideo}
                     className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors z-30"
                  >
                     <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                        <svg
                           className="w-8 h-8 text-white"
                           fill="currentColor"
                           viewBox="0 0 24 24"
                        >
                           <path d="M8 5v14l11-7z" />
                        </svg>
                     </div>
                  </button>
               )}
            </div>
         )}
         {/* 반투명 오버레이 */}
         <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
         <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center px-4">
            <h2 className="text-white text-3xl font-bold drop-shadow-lg mb-2 sr-only">
               {BANNER_TITLE}
            </h2>
            <p className="text-white/90 text-lg drop-shadow-md sr-only">
               {BANNER_DESCRIPTION}
            </p>
         </div>
      </div>
   )
}
