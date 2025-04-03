'use client'

import { Progress } from '@/shared/shadcn/ui/progress'
import { TopPost } from '@/types/boardTypes'
import { useCallback, useEffect, useRef, useState } from 'react'
import BannerList from './banner-list'
import Thumbnail from './banner-thumbnail'

interface Props {
   topData: TopPost[]
}

const TIMER = 5000
const DURATION = TIMER / 100

export default function Banner({ topData }: Props) {
   const [currentSlide, setCurrentSlide] = useState(0)
   const [progress, setProgress] = useState(0)
   const intervalRef = useRef<NodeJS.Timeout | null>(null)

   // 🔹 Progress 업데이트 및 슬라이드 변경 로직
   const updateTimer = useCallback(() => {
      setProgress(0) // 초기화

      intervalRef.current = setInterval(() => {
         setProgress((prev) => {
            if (prev >= 100) {
               setCurrentSlide((prevSlide) => (prevSlide + 1) % topData.length)
               return 0
            }
            return prev + 1
         })
      }, DURATION)
   }, [topData.length]) // 🔥 DURATION 제거 (고정값이므로 필요 없음)

   useEffect(() => {
      updateTimer()
      return () => {
         if (intervalRef.current) clearInterval(intervalRef.current)
      }
   }, [updateTimer])

   return (
      <div className="w-full">
         <div className="flex flex-wrap border border-black">
            {/* 게시물 프리뷰 */}
            <Thumbnail data={topData[currentSlide]} />
            <div className="flex flex-1 flex-col justify-between">
               {/* 베스트 게시물 리스트 */}
               <BannerList topData={topData} selectedPost={currentSlide} />
               {/* 프로그레스바 */}
               <Progress className="rounded-none" value={progress} />
            </div>
         </div>
      </div>
   )
}
