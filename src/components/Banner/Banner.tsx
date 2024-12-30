'use client'
import React, { useEffect, useRef, useState } from 'react'
import { TopPost } from '@/types/boardTypes'
import BannerThumbnail from './BannerThumbnail'
import BannerList from './BannerList'
import ProgressBar from '../common/Progress/ProgressBar'

interface Props {
   topData: TopPost[]
}

export default function Banner({ topData }: Props) {
   const [currentSlide, setCurrentSlide] = useState(0) // 현재 슬라이더
   const [progress, setProgress] = useState(0)

   const TIMER = 5000
   const DURATION = TIMER / 100

   useEffect(() => {
      let interval
      const updateTimer = () => {
         let percent = 0
         interval = setInterval(() => {
            if (percent >= 100) {
               setCurrentSlide((prevSlide) => (prevSlide + 1) % topData.length)
               percent = 0
            } else {
               percent += 1
               setProgress(percent)
            }
         }, DURATION)
      }

      updateTimer()
      return () => clearInterval(interval)
   }, [DURATION, topData.length]) // 캐러셀 타이머

   return (
      <div className="w-full">
         <div className="flex flex-wrap border border-black  ">
            {/*  게시물 프리뷰 */}
            <BannerThumbnail data={topData[currentSlide]} />
            <div className="flex flex-1 flex-col justify-between">
               {/* 베스트 게시물 리스트 */}
               <BannerList topData={topData} selectedPost={currentSlide} />
               {/* 프로그레스바 */}
               <ProgressBar progress={progress} />
            </div>
         </div>
      </div>
   )
}
