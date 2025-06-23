'use client'

import { Progress } from '@/shared/shadcn/ui/progress'
import { useEffect, useState } from 'react'
import BannerList from './banner-list'
import Thumbnail from './banner-thumbnail'

const SLIDE_DURATION = 5000 // 전체 진행 시간
const PAUSE_DURATION = 500 // 0%에서 멈추는 시간(ms)

export default function Banner({ data }: any) {
   const [currentIndex, setCurrentIndex] = useState(0)
   const [progress, setProgress] = useState(0)

   useEffect(() => {
      let intervalId: NodeJS.Timeout
      let pauseId: NodeJS.Timeout

      setProgress(0) // 슬라이드가 바뀌면 progress 초기화

      pauseId = setTimeout(() => {
         let current = 0
         intervalId = setInterval(
            () => {
               current += 1
               if (current >= 100) {
                  setCurrentIndex((prev) => (prev + 1) % data.length)
                  clearInterval(intervalId)
               } else {
                  setProgress(current)
               }
            },
            (SLIDE_DURATION - PAUSE_DURATION) / 100,
         )
      }, PAUSE_DURATION)

      return () => {
         clearTimeout(pauseId)
         clearInterval(intervalId)
      }
   }, [currentIndex, data.length])

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
