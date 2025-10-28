const nextConfig = {
  experimental: {
    scrollRestoration: false, // 스크롤 복원 비활성화
    optimizePackageImports: ["@radix-ui/react-icons"], // Hydration 최적화
  },
  // Hydration 문제 완화
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "wqgbhahmhmeuzjvrszjj.supabase.co",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  }, // 빌드 시 타입스크립트 오류를 무시
  // ESLint 설정은 .eslintrc.json에서 관리
  compiler: {
    removeConsole: process.env.NODE_ENV === "production", // 프로덕션 빌드에서만 콘솔 로그 제거
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
    level: "verbose", // 로깅 레벨을 verbose로 설정
  },
};

module.exports = nextConfig;
