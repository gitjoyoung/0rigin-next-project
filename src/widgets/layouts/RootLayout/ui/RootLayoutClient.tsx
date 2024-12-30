'use client'

import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import { inter } from '@/app/ui/fonts'
import Ticker from '@/widgets/Ticker'

interface RootLayoutClientProps {
   children: React.ReactNode
}

export default function RootLayoutClient({ children }: RootLayoutClientProps) {
   return (
      <>
         <Ticker />
         {/* <Header />
         <main className={`${inter.className} antialiased min-h-[80vh] w-full`}>
            {children}
         </main>
         <Footer /> */}
      </>
   )
}
