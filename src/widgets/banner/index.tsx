'use client'

import { Button } from '@/shared/shadcn/ui/button'
import { Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import BannerList from './banner-list'
import Thumbnail from './banner-thumbnail'

const SLIDE_DURATION = 5000

export default function Banner({ data }: any) {
   const [currentIndex, setCurrentIndex] = useState(0)
   const [isPaused, setIsPaused] = useState(false)
   const currentIndexRef = useRef(0)
   const timerRef = useRef<NodeJS.Timeout | null>(null)

   useEffect(() => {
      currentIndexRef.current = currentIndex
   }, [currentIndex])

   useEffect(() => {
      if (!isPaused && data.length > 1) {
         timerRef.current = setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % data.length)
         }, SLIDE_DURATION)
      }

      return () => {
         if (timerRef.current) {
            clearTimeout(timerRef.current)
         }
      }
   }, [currentIndex, data.length, isPaused])

   const togglePlayPause = () => {
      setIsPaused((prev) => !prev)
   }

   return (
      <div className="w-full">
         <div className="flex flex-wrap h-full md:h-64">
            <div className="sm:w-[50%] w-full h-64">
               <Thumbnail postData={data[currentIndex]} />
            </div>
            <div className="flex flex-col justify-between sm:w-[50%] w-full  h-64 ">
               <BannerList postData={data} selectedPost={currentIndex} />
               <div className=" items-center gap-2 px-2 hidden sm:flex ">
                  <Button
                     variant="ghost"
                     size="icon"
                     onClick={togglePlayPause}
                     aria-label={
                        isPaused ? '슬라이드 재생' : '슬라이드 일시정지'
                     }
                     className="flex items-center gap-1"
                  >
                     {isPaused ? (
                        <Play className="w-2 h-2" />
                     ) : (
                        <Pause className="w-2 h-2" />
                     )}
                  </Button>
                  <div
                     key={`${currentIndex}-${isPaused}`}
                     aria-label="게시물 슬라이드 프로그레스바"
                     className="relative flex-1 h-2 bg-gray-200 overflow-hidden"
                  >
                     {!isPaused && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-2 rounded-full z-10 shadow-lg bg-gradient-to-r from-black to-neutral-700 animate-progress-bar" />
                     )}
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
