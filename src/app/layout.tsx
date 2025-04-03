import AppProviders from '@/providers'
import Footer from '@/widgets/footer'
import Header from '@/widgets/header'
import Ticker from '@/widgets/ticker'
import { Fira_Code, Roboto } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'
import Loading from './loading'

const roboto = Roboto({
   weight: '400',
   subsets: ['latin'],
})

const firaCode = Fira_Code({
   subsets: ['latin'],
   weight: ['400', '500', '700'],
   display: 'swap',
   variable: '--font-fira-code',
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
         className={`${roboto.className} ${firaCode.variable}`}
      >
         <body>
            <AppProviders>
               <div id="modal-root" />
               <div className="flex min-h-screen flex-col items-center w-full bg-background">
                  <div className="w-full max-w-[1280px] px-1 px-auto flex flex-col flex-1">
                     <Ticker />
                     <Header />
                     <main className="flex-1 w-full">
                        <Suspense fallback={<Loading />}>{children}</Suspense>
                     </main>
                     <div className="mt-auto">
                        <Footer />
                     </div>
                  </div>
               </div>
            </AppProviders>
         </body>
      </html>
   )
}
