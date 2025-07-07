'use client'

import { Progress } from '@/shared/shadcn/ui/progress'
import { useEffect, useRef, useState } from 'react'
import BannerList from './banner-list'
import Thumbnail from './banner-thumbnail'

const INITIAL_DATA = {
   SLIDE_DURATION: 3000,
   UPDATE_INTERVAL: 50,
}

export default function Banner({ data }: any) {
   const [currentIndex, setCurrentIndex] = useState(0)
   const [progress, setProgress] = useState(0)
   const currentIndexRef = useRef(0)

   // currentIndex가 변경될 때 ref도 업데이트
   useEffect(() => {
      currentIndexRef.current = currentIndex
   }, [currentIndex])

   useEffect(() => {
      const progressStep =
         (INITIAL_DATA.UPDATE_INTERVAL / INITIAL_DATA.SLIDE_DURATION) * 100
      const intervalId = setInterval(() => {
         setProgress((prev) => {
            const newProgress = prev + progressStep

            if (newProgress >= 100) {
               const nextIndex = (currentIndexRef.current + 1) % data.length
               setCurrentIndex(nextIndex)
               return 0
            }
            return newProgress
         })
      }, INITIAL_DATA.UPDATE_INTERVAL)

      return () => {
         clearInterval(intervalId)
      }
   }, [data.length])

   return (
      <div className="w-full">
         <div className="flex flex-wrap border">
            <Thumbnail postData={data[currentIndex]} />
            <div className="flex flex-1 flex-col justify-between">
               <BannerList postData={data} selectedPost={currentIndex} />
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
