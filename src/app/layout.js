import { Control } from "./Control";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "./../components/Footer/Footer";
import { inter } from '@/app/ui/fonts';
export const metadata = {
  title: "origin project",
  description: "오리진 프로젝트",
  keywords: ["origin"],
};
export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>

        <Header />
        <main className={`${inter.className} antialiased min-h-[100vh] w-full `}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
