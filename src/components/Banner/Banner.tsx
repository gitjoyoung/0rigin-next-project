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
   }, [DURATION, topData.length]) // Include missing dependencies here

   return (
      <section className="w-full mx-0.5 my-1 flex flex-col flex-wrap border border-black   ">
         <div className="flex flex-wrap">
            {/*  게시물 프리뷰 */}
            <BannerThumbnail data={topData[currentSlide]} />
            {/* 베스트 게시물 리스트 */}
            <div className="flex flex-1 flex-col justify-between">
               <BannerList topData={topData} selectedPost={currentSlide} />
               {/* 프로그레스바 */}
               <ProgressBar progress={progress} />
            </div>
         </div>
      </section>
   )
}
