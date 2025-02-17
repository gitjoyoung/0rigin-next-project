'use client'

import Footer from '@/widgets/Footer/Footer'
import Header from '@/widgets/Header/Header'
import Ticker from '@/widgets/Ticker'

interface RootLayoutClientProps {
   children: React.ReactNode
}

export default function GlobalLayoutClient({
   children,
}: RootLayoutClientProps) {
   return (
      <div className="flex min-h-screen flex-col items-center w-full bg-background">
         {/* Ticker는 전체 너비 사용 */}
         <div className="w-full">
            <Ticker />
         </div>

         {/* 헤더, 메인, 푸터를 감싸는 래퍼 */}
         <div className="w-full max-w-[1280px] px-4">
            <Header />
            <main className="min-h-[80vh] w-full">{children}</main>
            <Footer />
         </div>
      </div>
   )
}
