import './globals.css'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ThemeProvider } from 'next-themes'
import { Roboto } from 'next/font/google'
import { cn } from '@/shared/utils/cn'
import { SessionProvider } from 'next-auth/react'
import GlobalLayoutClient from './GlobalLayoutClient'

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
      <html lang="en" className={cn('dark', roboto.className)}>
         <body>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
               <div id="modal-root" />
               <SessionProvider>
                  <GlobalLayoutClient>{children}</GlobalLayoutClient>
               </SessionProvider>
               <SpeedInsights />
            </ThemeProvider>
         </body>
      </html>
   )
}
