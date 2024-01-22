import { Control } from './Control';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from './../components/Footer/Footer';
import { inter } from '@/app/ui/fonts';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

export const metadata = {
   title: '0rigin project',
   description: '제로리진 프로젝트',
   keywords: ['origin', '0rigin'],
};
export default function RootLayout({ children }) {
   return (
      <html>
         <body>
            <Header />
            <main className={`${inter.className} antialiased min-h-[100vh] w-full `}>
               {children}
            </main>
            <Footer />
         </body>
      </html>
   );
}
