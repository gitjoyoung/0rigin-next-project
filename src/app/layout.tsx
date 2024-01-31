import Header from '@/components/Header/Header'
import Ticker from '@/components/Header/Ticker'
import { inter } from '@/app/ui/fonts'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import './globals.css'
import Footer from '@/components/Footer/Footer'

config.autoAddCss = false

export const metadata = {
   title: '0rigin project',
   description: '제로리진 프로젝트',
   keywords: ['origin', '0rigin'],
}
export default function RootLayout({
   children,
}: {
   children: React.ReactNode
}) {
   return (
      <html lang="en">
         <body>
            <Ticker />
            <Header />
            <main
               className={`${inter.className} antialiased min-h-[100vh] w-full `}
            >
               {children}
            </main>
            <Footer />
         </body>
      </html>
   )
}
