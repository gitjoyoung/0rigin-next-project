import type { Metadata } from "next";

// 기본 사이트 정보
export const SITE_CONFIG = {
  name: "0RIGIN(제로리진)",
  title: "0RIGIN(제로리진) - 무, 공, 허무 그리고 아포리아",
  description:
    "0RIGIN(제로리진)은 철학, 기술, 과학, 수학에 대한 깊이 있는 토론·지식 공유·협업이 한곳에서 이루어지는 차세대 커뮤니티 플랫폼입니다. 다양한 의견을 자유롭게 나누어 보세요.",
  url: "https://0rigin.space",
  ogImage: "/images/introduce/logo.png",
  keywords: [
    "제로리진",
    "0RIGIN",
    "0rigin",
    "origin community",
    "커뮤니티 플랫폼",
    "온라인 포럼",
    "지식 공유",
    "토론",
    "프로젝트 협업",
    "철학",
    "기술",
    "과학",
    "수학",
  ] as string[],
};

// 기본 메타데이터
export const baseMetadata: Metadata = {
  /* ───────── 제목 ───────── */
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.name}`,
  },

  /* ───────── 설명 ───────── */
  description: SITE_CONFIG.description,

  /* ───────── 키워드 ───────── */
  keywords: SITE_CONFIG.keywords,

  /* ───────── 파비콘 ───────── */
  icons: { icon: "/favicon.ico" },

  /* ───────── 저작자 ───────── */
  authors: [{ name: `${SITE_CONFIG.name} 팀`, url: SITE_CONFIG.url }],

  /* ───────── Open Graph ───────── */
  openGraph: {
    type: "website",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.title,
    description:
      "철학, 기술, 과학, 수학에 대한 깊이 있는 토론·지식 공유·프로젝트 협업까지 한 번에! 지금 0RIGIN(제로리진)에서 새로운 인사이트를 얻어 보세요.",
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} 커뮤니티 미리보기`,
      },
    ],
    locale: "ko_KR",
  },

  /* ───────── Twitter Card ───────── */
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: `철학, 기술, 과학, 수학에 대한 깊이 있는 토론과 지식 공유가 가능한 ${SITE_CONFIG.name}에 참여해 보세요!`,
    images: [SITE_CONFIG.ogImage],
  },

  /* ───────── Canonical ───────── */
  alternates: { canonical: SITE_CONFIG.url },

  /* ───────── 추가 메타데이터 ───────── */
  creator: "0RIGIN(제로리진)",
  publisher: "0RIGIN(제로리진)",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(SITE_CONFIG.url),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "9N9lYYZS6l2HaeOTiw2oBwDSd3rln6z8zuWBI0rTesw",
  },
};
