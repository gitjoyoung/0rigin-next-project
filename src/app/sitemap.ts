import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://0rigin.space'
   const currentDate = new Date().toISOString()

   // 정적 페이지들
   const staticPages = [
      {
         url: baseUrl,
         lastModified: currentDate,
         changeFrequency: 'daily' as const,
         priority: 1,
      },
      {
         url: `${baseUrl}/introduce`,
         lastModified: currentDate,
         changeFrequency: 'monthly' as const,
         priority: 0.5,
      },
      {
         url: `${baseUrl}/help`,
         lastModified: currentDate,
         changeFrequency: 'monthly' as const,
         priority: 0.4,
      },
      {
         url: `${baseUrl}/inquiry`,
         lastModified: currentDate,
         changeFrequency: 'monthly' as const,
         priority: 0.4,
      },
      {
         url: `${baseUrl}/sitemap`,
         lastModified: currentDate,
         changeFrequency: 'daily' as const,
         priority: 0.7,
      },
      {
         url: `${baseUrl}/login`,
         lastModified: currentDate,
         changeFrequency: 'monthly' as const,
         priority: 0.3,
      },
      {
         url: `${baseUrl}/sign`,
         lastModified: currentDate,
         changeFrequency: 'monthly' as const,
         priority: 0.3,
      },
   ]

   // 게시판 카테고리 페이지들
   const boardCategories = [
      'philosophy',
      'technology',
      'science',
      'mathematics',
   ]
   const boardPages = boardCategories.map((category) => ({
      url: `${baseUrl}/board/${category}`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.8,
   }))

   // 퀴즈 카테고리 페이지들
   const quizCategories = [
      'programming',
      'science',
      'computer-science',
      'philosophy',
   ]
   const quizPages = quizCategories.map((category) => ({
      url: `${baseUrl}/quiz/${category}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
   }))

   // 유틸리티 페이지들
   const utilityPages = [
      {
         url: `${baseUrl}/utils`,
         lastModified: currentDate,
         changeFrequency: 'monthly' as const,
         priority: 0.6,
      },
      {
         url: `${baseUrl}/utils/image-converter`,
         lastModified: currentDate,
         changeFrequency: 'monthly' as const,
         priority: 0.5,
      },
      {
         url: `${baseUrl}/utils/memo`,
         lastModified: currentDate,
         changeFrequency: 'monthly' as const,
         priority: 0.5,
      },
   ]

   // 메인 카테고리 페이지들
   const mainPages = [
      {
         url: `${baseUrl}/board`,
         lastModified: currentDate,
         changeFrequency: 'daily' as const,
         priority: 0.9,
      },
      {
         url: `${baseUrl}/quiz`,
         lastModified: currentDate,
         changeFrequency: 'weekly' as const,
         priority: 0.8,
      },
      {
         url: `${baseUrl}/utils`,
         lastModified: currentDate,
         changeFrequency: 'monthly' as const,
         priority: 0.6,
      },
   ]

   return [
      ...staticPages,
      ...mainPages,
      ...boardPages,
      ...quizPages,
      ...utilityPages,
   ]
}
