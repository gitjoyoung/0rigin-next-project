import Header from '@/components/Header/Header'
import { inter } from '@/app/ui/fonts'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import './ui/globals.css'
import Footer from '@/components/Footer/Footer'
import Ticker from '@/components/Ticker/Ticker'
import { SpeedInsights } from '@vercel/speed-insights/next'

config.autoAddCss = false

export const metadata = {
   title: {
      default: 'HOME | 0rigin project',
      template: '%s | 0rigin project',
   },
   description: '제로리진 프로젝트',
   keywords: ['origin', '0rigin'],
   icon: '/favicon.ico',
}
export default function RootLayout({
   children,
}: {
   children: React.ReactNode
}) {
   return (
      <html lang="en" className="dark">
         <body>
            <div id="modal-root" />
            <Ticker />
            <Header />
            <main
               className={`${inter.className} antialiased min-h-[80vh] w-full`}
            >
               {children}
            </main>
            <Footer />
            <SpeedInsights />
         </body>
      </html>
   )
}
