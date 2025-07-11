'use client'

import type { Tables } from '@/shared/types'
import { useEffect, useRef, useState } from 'react'
import BannerList from './banner-list'
import BannerSlide from './banner-slide'
import Thumbnail from './banner-thumbnail'

const SLIDE_DURATION = 5000

export default function Banner({ data }: { data: Tables<'posts'>[] }) {
   const [currentIndex, setCurrentIndex] = useState<number>(0)
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
      <article className="flex flex-wrap  ">
         <Thumbnail
            postData={data[currentIndex]}
            className="sm:w-[50%] w-full sm:h-48 h-36"
         />
         <section className="flex flex-col sm:w-[50%] h-48 justify-between">
            <BannerList postData={data} selectedPost={currentIndex} />
            <BannerSlide
               currentIndex={currentIndex}
               isPaused={isPaused}
               togglePlayPause={togglePlayPause}
            />
         </section>
      </article>
   )
}
