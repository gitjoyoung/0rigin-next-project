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
      <>
         <Ticker />
         <Header />
         <main className={` antialiased min-h-[80vh] w-full`}>{children}</main>
         <Footer />
      </>
   )
}
