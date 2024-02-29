import Header from '@/components/Header/Header'
import { inter } from '@/app/ui/fonts'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import './ui/globals.css'
import Footer from '@/components/Footer/Footer'
import Ticker from '@/components/Ticker/Ticker'
import AuthSession from './api/providers/AuthSession'

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
      <html lang="en" className="dark">
         <body>
            <AuthSession>
               <div id="modal-root" />
               <Ticker />
               <Header />
               <main
                  className={`${inter.className} antialiased min-h-full w-full `}
               >
                  {children}
               </main>
               <Footer />
            </AuthSession>
         </body>
      </html>
   )
}
