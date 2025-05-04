import AppProviders from '@/providers'
import Footer from '@/widgets/footer'
import Header from '@/widgets/header'
import Ticker from '@/widgets/ticker'
import { Roboto } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'
import Loading from './loading'

const roboto = Roboto({
   weight: '400',
   subsets: ['latin'],
})

export default function RootLayout({
   children,
}: {
   children: React.ReactNode
}) {
   return (
      <html
         lang="ko"
         suppressHydrationWarning
         className={`${roboto.className}`}
      >
         <body>
            <AppProviders>
               <div id="modal-root" />
               <div className="flex min-h-screen flex-col items-center w-full bg-background">
                  <div className="w-full max-w-[1280px] px-auto flex flex-col flex-1">
                     <Ticker />
                     <Header />
                     <main className="flex-1 w-full min-h-screen">
                        <Suspense fallback={<Loading />}>{children}</Suspense>
                     </main>
                     <Footer />
                  </div>
               </div>
            </AppProviders>
         </body>
      </html>
   )
}
