'use client'

import { Progress } from '@/shared/shadcn/ui/progress'
import { useCallback, useEffect, useRef, useState } from 'react'
import BannerList from './banner-list'
import Thumbnail from './banner-thumbnail'

const TIMER = 5000
const DURATION = TIMER / 100

export default function Banner({ topData }: any) {
   const [currentSlide, setCurrentSlide] = useState(0)
   const [progress, setProgress] = useState(0)
   const intervalRef = useRef<NodeJS.Timeout | null>(null)

   const updateTimer = useCallback(() => {
      setProgress(0)
      intervalRef.current = setInterval(() => {
         setProgress((prev) => {
            if (prev >= 100) {
               setCurrentSlide((prevSlide) => (prevSlide + 1) % topData.length)
               return 0
            }
            return prev + 1
         })
      }, DURATION)
   }, [topData.length])

   useEffect(() => {
      updateTimer()
      return () => {
         if (intervalRef.current) clearInterval(intervalRef.current)
      }
   }, [updateTimer])

   return (
      <div className="w-full">
         <div className="flex flex-wrap border border-black">
            <Thumbnail postData={topData[currentSlide]} />
            <div className="flex flex-1 flex-col justify-between">
               <BannerList postData={topData} selectedPost={currentSlide} />
               <Progress
                  aria-label="게시물 슬라이드 프로그레스바"
                  className="rounded-none"
                  value={progress}
               />
            </div>
         </div>
      </div>
   )
}
