import type { Metadata } from 'next'
import { baseMetadata, SITE_CONFIG } from './base-metadata'

interface MetadataOptions {
   title?: string
   description?: string
   path?: string
   image?: string
   keywords?: string[]
   noIndex?: boolean
}

/**
 * 페이지별 메타데이터를 생성하는 함수
 */
export function generateMetadata({
   title,
   description,
   path = '',
   image,
   keywords,
   noIndex = false,
}: MetadataOptions = {}): Metadata {
   const pageTitle = title
      ? `${title} | ${SITE_CONFIG.name}`
      : SITE_CONFIG.title
   const pageDescription = description || SITE_CONFIG.description
   const pageUrl = `${SITE_CONFIG.url}${path}`
   const pageImage = image || SITE_CONFIG.ogImage
   const pageKeywords = keywords || SITE_CONFIG.keywords

   return {
      ...baseMetadata,
      title: pageTitle,
      description: pageDescription,
      keywords: pageKeywords,

      ...(noIndex && { robots: { index: false, follow: false } }),

      openGraph: {
         ...baseMetadata.openGraph,
         title: pageTitle,
         description: pageDescription,
         url: pageUrl,
         images: [
            {
               url: pageImage,
               width: 1200,
               height: 630,
               alt: `${pageTitle} 미리보기`,
            },
         ],
      },

      twitter: {
         ...baseMetadata.twitter,
         title: pageTitle,
         description: pageDescription,
         images: [pageImage],
      },

      alternates: {
         canonical: pageUrl,
      },
   }
}

/**
 * 홈페이지 전용 메타데이터
 */
export const homeMetadata = generateMetadata({
   title: undefined, // 기본 제목 사용
   description: SITE_CONFIG.description,
})

/**
 * 게시판 메타데이터 생성
 */
export function generateBoardMetadata(category: string, postTitle?: string) {
   if (postTitle) {
      return generateMetadata({
         title: postTitle,
         description: `${SITE_CONFIG.name}의 ${category} 게시판에서 "${postTitle}" 글을 확인해보세요.`,
         path: `/board/${category}`,
      })
   }

   return generateMetadata({
      title: `${category} 게시판`,
      description: `${category}에 관한 다양한 글과 토론을 ${SITE_CONFIG.name}에서 만나보세요.`,
      path: `/board/${category}`,
   })
}

/**
 * 퀴즈 메타데이터 생성
 */
export function generateQuizMetadata(quizTitle?: string) {
   if (quizTitle) {
      return generateMetadata({
         title: `퀴즈: ${quizTitle}`,
         description: `"${quizTitle}" 퀴즈를 ${SITE_CONFIG.name}에서 풀어보세요!`,
         path: '/quiz',
      })
   }

   return generateMetadata({
      title: '퀴즈',
      description: `다양한 분야의 흥미로운 퀴즈를 ${SITE_CONFIG.name}에서 도전해보세요!`,
      path: '/quiz',
   })
}
