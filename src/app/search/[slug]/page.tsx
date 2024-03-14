import Search from '@/components/Search/Search'
import React from 'react'

export default function page({ params }: { params: { slug: string } }) {
   // 파라미터에서 slug 추출
   const { slug } = params
   // 검색어 그대로 사용하기 위해 디코딩
   const decodeSlug = decodeURIComponent(slug).replace(/\+/g, ' ')

   // Perform search logic here and store the results in a variable

   return <Search decodeSlug={decodeSlug} />
}
