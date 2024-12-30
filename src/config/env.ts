export const ENV = {
   NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET!,
   DATABASE_URL: process.env.DATABASE_URL!,
   // ... 기타 환경 변수
} as const

// 환경 변수 유효성 검사
Object.entries(ENV).forEach(([key, value]) => {
   if (!value) throw new Error(`Missing environment variable: ${key}`)
})
