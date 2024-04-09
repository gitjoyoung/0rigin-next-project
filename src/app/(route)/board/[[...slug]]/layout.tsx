'use client'

import {
   fetchLatestPostId,
   fetchPosts,
} from '@/app/api/board/post/fetchPostApi'
import BoardContent from '@/components/Board/BoardContent'
import BoardFooter from '@/components/Board/BoardFooter'
import BoardHeader from '@/components/Board/BoardHeader'
import Pagination from '@/components/Board/Pagination'
import { validateSlug } from '@/utils/slugValidators/slug'
import React from 'react'

export default async function layout({ children, params }) {
   const { slug } = params
   const pageSlug = slug?.[0]
   const page: number = validateSlug(pageSlug) ? parseInt(pageSlug, 10) : 1

   const lastPostId = await fetchLatestPostId()
   const posts = await fetchPosts(page, lastPostId, 20)

   return (
      <>
         <BoardHeader title="왁자지껄 게시판" />
         {children}
         <BoardContent postData={posts} page={page} />
         <Pagination page={page} lastPostId={lastPostId} />
         <BoardFooter />
      </>
   )
}
