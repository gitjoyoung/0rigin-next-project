'use client'
import { Button } from '@/shared/shadcn/ui/button'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'

export default function WelcomePage({ userEmail }: { userEmail: string }) {
   const [windowDimension, setWindowDimension] = useState({
      width: 0,
      height: 0,
   })
   const [showConfetti, setShowConfetti] = useState(true)

   useEffect(() => {
      // 윈도우 크기 설정
      const updateWindowDimensions = () => {
         setWindowDimension({
            width: window.innerWidth,
            height: window.innerHeight,
         })
      }

      updateWindowDimensions()
      window.addEventListener('resize', updateWindowDimensions)

      // 5초 후 confetti 효과 중지
      const timer = setTimeout(() => {
         setShowConfetti(false)
      }, 5000)

      return () => {
         window.removeEventListener('resize', updateWindowDimensions)
         clearTimeout(timer)
      }
   }, [])

   return (
      <div className="min-h-72 flex flex-col items-center justify-center px-2">
         {showConfetti && (
            <Confetti
               width={windowDimension.width}
               height={windowDimension.height}
               recycle={false}
               numberOfPieces={300}
               gravity={0.3}
            />
         )}
         <div className="max-w-md w-full space-y-8 p-8 rounded-lg">
            <div className="text-center">
               <h2 className="text-2xl font-bold tracking-tight">
                  {userEmail} 님!
               </h2>
               <h2 className="mt-6 text-3xl font-extrabold">
                  회원가입을 축하합니다! 🎉
               </h2>
               <p className="mt-2 text-sm">
                  이제 0RIGIN(제로리진)의 모든 기능을 사용하실 수 있습니다.
               </p>
            </div>

            <div className="mt-8 space-y-4">
               <Button asChild className="w-full">
                  <Link href="/">홈으로 가기</Link>
               </Button>
            </div>
         </div>
      </div>
   )
}
