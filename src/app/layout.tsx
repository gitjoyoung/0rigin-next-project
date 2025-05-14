import AppProviders from '@/shared/providers'
import { Toaster } from '@/shared/shadcn/ui/toaster'
import Footer from '@/widgets/footer'
import Header from '@/widgets/header'
import Ticker from '@/widgets/ticker'
import { Noto_Sans_KR } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'
import Loading from './loading'

const notoSansKR = Noto_Sans_KR({
   weight: ['400', '500', '700'],
   subsets: ['latin'],
   display: 'swap',
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
         className={`${notoSansKR.className}`}
      >
         <body>
            <AppProviders>
               <div id="modal-root" />
               <div className="flex min-h-screen flex-col items-center w-full bg-background">
                  <div className="w-full max-w-[1280px] px-auto flex flex-col flex-1">
                     <Ticker />
                     <Header />
                     <main className="flex-1 w-full min-h-screen font-dos">
                        <Suspense fallback={<Loading />}>{children}</Suspense>
                     </main>
                     <Footer />
                  </div>
               </div>
               <Toaster />
            </AppProviders>
         </body>
      </html>
   )
}
