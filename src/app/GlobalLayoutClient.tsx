'use client'

import Footer from '@/widgets/Footer/Footer'
import Header from '@/widgets/Header'
import Ticker from '@/widgets/Ticker'

interface RootLayoutClientProps {
   children: React.ReactNode
}

export default function GlobalLayoutClient({
   children,
}: RootLayoutClientProps) {
   return (
      <div className="flex min-h-screen flex-col items-center w-full bg-background">
         {/* 헤더, 메인, 푸터를 감싸는 래퍼 */}
         <div className="w-full max-w-[1280px] px-1 px-auto flex flex-col flex-1">
            <Ticker />
            <Header />
            <main className="flex-1 w-full">{children}</main>
            <div className="mt-auto">
               <Footer />
            </div>
         </div>
      </div>
   )
}
