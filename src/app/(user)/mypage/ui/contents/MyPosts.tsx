'use client'

import { Button } from '@/shared/shadcn/ui/button'
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
} from '@/shared/shadcn/ui/card'

interface Post {
   id: string
   title: string
   content: string
   createdAt: string
   likes: number
   comments: number
}

export default function MyPosts() {
   // 임시 데이터
   const posts: Post[] = [
      {
         id: '1',
         title: '첫 번째 게시글',
         content: '게시글 내용입니다...',
         createdAt: '2024-03-20',
         likes: 5,
         comments: 3,
      },
      // 더 많은 임시 데이터...
   ]

   return (
      <div className="space-y-4">
         <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">내가 작성한 글</h2>
            <Button>새 글 작성</Button>
         </div>

         <div className="grid gap-4">
            {posts.map((post) => (
               <Card
                  key={post.id}
                  className="hover:shadow-lg transition-shadow"
               >
                  <CardHeader>
                     <CardTitle className="text-xl">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                     <p className="text-gray-600 mb-2">{post.content}</p>
                     <div className="flex justify-between text-sm text-gray-500">
                        <span>{post.createdAt}</span>
                        <div className="flex gap-4">
                           <span>좋아요 {post.likes}</span>
                           <span>댓글 {post.comments}</span>
                        </div>
                     </div>
                  </CardContent>
               </Card>
            ))}
         </div>
      </div>
   )
}
