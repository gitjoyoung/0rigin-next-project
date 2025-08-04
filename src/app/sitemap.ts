import { getActiveCategories } from '@/entities/category'
import { getPostList } from '@/entities/post'
import { MetadataRoute } from 'next'

// ISR 설정 - 1시간마다 사이트맵 재생성
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
   const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://0rigin.space'
   const currentDate = new Date()

   // 정적 페이지들 (항상 포함)
   const staticPages: MetadataRoute.Sitemap = [
      {
         url: baseUrl,
         lastModified: currentDate,
         changeFrequency: 'daily',
         priority: 1.0,
      },
      {
         url: `${baseUrl}/introduce`,
         lastModified: currentDate,
         changeFrequency: 'monthly',
         priority: 0.8,
      },
      {
         url: `${baseUrl}/board`,
         lastModified: currentDate,
         changeFrequency: 'daily',
         priority: 0.9,
      },
      {
         url: `${baseUrl}/board/latest`,
         lastModified: currentDate,
         changeFrequency: 'hourly',
         priority: 0.9,
      },
      {
         url: `${baseUrl}/quiz`,
         lastModified: currentDate,
         changeFrequency: 'weekly',
         priority: 0.8,
      },
      {
         url: `${baseUrl}/quiz/create`,
         lastModified: currentDate,
         changeFrequency: 'monthly',
         priority: 0.6,
      },
      {
         url: `${baseUrl}/question`,
         lastModified: currentDate,
         changeFrequency: 'daily',
         priority: 0.7,
      },
      {
         url: `${baseUrl}/utils`,
         lastModified: currentDate,
         changeFrequency: 'monthly',
         priority: 0.6,
      },
      {
         url: `${baseUrl}/utils/image-converter`,
         lastModified: currentDate,
         changeFrequency: 'monthly',
         priority: 0.5,
      },
      {
         url: `${baseUrl}/utils/memo`,
         lastModified: currentDate,
         changeFrequency: 'monthly',
         priority: 0.5,
      },
      {
         url: `${baseUrl}/help`,
         lastModified: currentDate,
         changeFrequency: 'monthly',
         priority: 0.4,
      },
      {
         url: `${baseUrl}/inquiry`,
         lastModified: currentDate,
         changeFrequency: 'monthly',
         priority: 0.4,
      },
      {
         url: `${baseUrl}/login`,
         lastModified: currentDate,
         changeFrequency: 'yearly',
         priority: 0.3,
      },
      {
         url: `${baseUrl}/sign`,
         lastModified: currentDate,
         changeFrequency: 'yearly',
         priority: 0.3,
      },
   ]

   // 동적 컨텐츠 추가 (에러가 나도 정적 페이지는 보장)
   let dynamicPages: MetadataRoute.Sitemap = []

   try {
      console.log('🗺️ Fetching categories for sitemap...')

      // 카테고리 페이지들
      const categories = await getActiveCategories()
      console.log(`📄 Found ${categories.length} categories`)

      const categoryPages: MetadataRoute.Sitemap = categories.map(
         (category) => ({
            url: `${baseUrl}/board/${category.slug}`,
            lastModified: currentDate,
            changeFrequency: 'daily',
            priority: 0.8,
         }),
      )

      dynamicPages = [...dynamicPages, ...categoryPages]

      // 최신 게시물들 (최근 50개로 제한)
      console.log('📝 Fetching latest posts for sitemap...')
      const { items: latestPosts } = await getPostList({
         page: 1,
         limit: 50,
      })

      console.log(`📝 Found ${latestPosts.length} latest posts`)

      const postPages: MetadataRoute.Sitemap = latestPosts.map((post) => ({
         url: `${baseUrl}/board/${post.category}/${post.id}`,
         lastModified: new Date(post.updated_at || post.created_at),
         changeFrequency: 'weekly',
         priority: 0.6,
      }))

      dynamicPages = [...dynamicPages, ...postPages]

      // 인기 카테고리별 추가 게시물 (에러 발생 시 스킵)
      const popularCategories = categories.slice(0, 3) // 상위 3개 카테고리만
      for (const category of popularCategories) {
         try {
            const { items: categoryPosts } = await getPostList({
               category: category.slug,
               page: 1,
               limit: 10, // 카테고리당 10개로 제한
            })

            categoryPosts.forEach((post) => {
               // 중복 방지
               const exists = dynamicPages.some(
                  (p) =>
                     p.url === `${baseUrl}/board/${post.category}/${post.id}`,
               )
               if (!exists) {
                  dynamicPages.push({
                     url: `${baseUrl}/board/${post.category}/${post.id}`,
                     lastModified: new Date(post.updated_at || post.created_at),
                     changeFrequency: 'weekly',
                     priority: 0.7,
                  })
               }
            })
         } catch (error) {
            console.warn(
               `⚠️ Failed to fetch posts for category ${category.slug}:`,
               error,
            )
         }
      }
   } catch (error) {
      console.error('❌ Error fetching dynamic content for sitemap:', error)

      // 에러 시 기본 카테고리 페이지라도 추가
      const fallbackCategories = [
         'philosophy',
         'ai-ethics',
         'technology',
         'science',
         'free-discussion',
      ]

      dynamicPages = fallbackCategories.map((slug) => ({
         url: `${baseUrl}/board/${slug}`,
         lastModified: currentDate,
         changeFrequency: 'daily',
         priority: 0.7,
      }))

      console.log('🔄 Using fallback categories for sitemap')
   }

   const allPages = [...staticPages, ...dynamicPages]

   // 중복 제거
   const uniquePages = allPages.filter(
      (page, index, self) =>
         index === self.findIndex((p) => p.url === page.url),
   )

   console.log(`🗺️ Sitemap generated successfully: ${uniquePages.length} pages`)
   console.log(
      `📊 Static pages: ${staticPages.length}, Dynamic pages: ${dynamicPages.length}`,
   )

   return uniquePages
}
