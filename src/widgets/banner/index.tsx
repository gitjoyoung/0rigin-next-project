'use client'

import { Progress } from '@/shared/shadcn/ui/progress'
import { useEffect, useState } from 'react'
import BannerList from './banner-list'
import Thumbnail from './banner-thumbnail'

const SLIDE_DURATION = 5000 // 전체 진행 시간
const UPDATE_INTERVAL = 50 // Progress 업데이트 주기 (ms)

export default function Banner({ data }: any) {
   const [currentIndex, setCurrentIndex] = useState(0)
   const [progress, setProgress] = useState(0)

   useEffect(() => {
      // Progress를 더 부드럽게 업데이트
      const progressStep = (UPDATE_INTERVAL / SLIDE_DURATION) * 100

      const intervalId = setInterval(() => {
         setProgress((prevProgress) => {
            const newProgress = prevProgress + progressStep

            if (newProgress >= 100) {
               // 다음 슬라이드로 이동
               setCurrentIndex((prev) => (prev + 1) % data.length)
               return 0 // Progress 초기화
            }

            return newProgress
         })
      }, UPDATE_INTERVAL)

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
