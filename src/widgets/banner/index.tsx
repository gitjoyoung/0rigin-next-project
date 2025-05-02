'use client'

import { Progress } from '@/shared/shadcn/ui/progress'
import { useCallback, useEffect, useRef, useState } from 'react'
import BannerList from './banner-list'
import Thumbnail from './banner-thumbnail'

const TIMER = 5000
const DURATION = TIMER / 100

export default function Banner({ data }: any) {
   const [currentSlide, setCurrentSlide] = useState(0)
   const [progress, setProgress] = useState(0)
   const intervalRef = useRef<NodeJS.Timeout | null>(null)
   const dataLengthRef = useRef(data.length)

   // data가 변경될 때만 dataLengthRef를 업데이트
   useEffect(() => {
      dataLengthRef.current = data.length
   }, [data.length])

   const updateTimer = useCallback(() => {
      intervalRef.current = setInterval(() => {
         setProgress((prev) => {
            if (prev >= 100) {
               setCurrentSlide(
                  (prevSlide) => (prevSlide + 1) % dataLengthRef.current,
               )
               return 0
            }
            return prev + 1
         })
      }, DURATION)
   }, [])

   useEffect(() => {
      updateTimer()
      return () => {
         if (intervalRef.current) {
            clearInterval(intervalRef.current)
         }
      }
   }, [updateTimer])

   // 슬라이드 변경 시에만 프로그레스바 업데이트
   useEffect(() => {
      setProgress(0)
   }, [currentSlide])

   return (
      <div className="w-full">
         <div className="flex flex-wrap border border-black">
            <Thumbnail postData={data[currentSlide]} />
            <div className="flex flex-1 flex-col justify-between">
               <BannerList postData={data} selectedPost={currentSlide} />
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
