import AppProviders from "@/app/providers";
import Footer from "@/feature/footer";
import Header from "@/feature/header";
import Ticker from "@/feature/ticker";
import { baseMetadata } from "@/shared/metadata";
import { GoogleTagManager } from "@next/third-parties/google";
import "@uiw/react-markdown-preview/markdown.css";
import "@uiw/react-md-editor/markdown-editor.css";
import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import localFont from "next/font/local";
import { Suspense } from "react";
import "./globals.css";
import Loading from "./loading";

// 한글 폰트 설정
const notoSansKR = Noto_Sans_KR({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans-kr",
});

// DOS 폰트 설정
const modernDOS = localFont({
  src: [
    {
      path: "../../public/fonts/modern_dos/ModernDOS8x8.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/modern_dos/ModernDOS8x14.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/modern_dos/ModernDOS8x16.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-dos",
  display: "swap",
  preload: true,
});

// 글로벌 메타데이터 (baseMetadata에서 모든 설정을 가져옴)
export const metadata: Metadata = baseMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={`${notoSansKR.variable} ${modernDOS.variable}`}
    >
      <GoogleTagManager gtmId="GTM-NNRM5BTB" />
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="naver-site-verification"
          content="f79a49708c95844fd87df7edf84526d803d6f736"
        />
      </head>
      <body>
        <AppProviders>
          <div id="modal-root" />
          <div className="flex min-h-screen flex-col items-center w-full ">
            <Ticker />
            <Header />
            <main className="w-full max-w-[1280px] pb-4 px-auto min-h-screen ">
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </main>
            <Footer />
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
