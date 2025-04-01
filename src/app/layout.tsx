import { AuthProvider } from '@/providers/AuthProvider'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import { Roboto } from 'next/font/google'
import { Suspense } from 'react'
import GlobalLayoutClient from './GlobalLayoutClient'
import './globals.css'
import Loading from './loading'
import ReactQueryProviders from './ReactQueryProvider'

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
      <html lang="ko" suppressHydrationWarning>
         <body>
            <ThemeProvider
               attribute="class"
               defaultTheme="system"
               enableSystem
               disableTransitionOnChange
            >
               <div id="modal-root" />
               <SessionProvider>
                  <AuthProvider>
                     <ReactQueryProviders>
                        <Suspense fallback={<Loading />}>
                           <GlobalLayoutClient>{children}</GlobalLayoutClient>
                        </Suspense>
                     </ReactQueryProviders>
                  </AuthProvider>
               </SessionProvider>
               <SpeedInsights />
            </ThemeProvider>
         </body>
      </html>
   )
}
