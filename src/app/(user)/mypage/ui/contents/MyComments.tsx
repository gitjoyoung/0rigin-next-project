'use client'

import { Card, CardContent } from '@/shared/shadcn/ui/card'

interface Comment {
   id: string
   postTitle: string
   content: string
   createdAt: string
}

export default function MyComments() {
   // 임시 데이터
   const comments: Comment[] = [
      {
         id: '1',
         postTitle: '게시글 제목',
         content: '댓글 내용입니다...',
         createdAt: '2024-03-20',
      },
      // 더 많은 임시 데이터...
   ]

   return (
      <div className="space-y-4">
         <h2 className="text-2xl font-bold">내가 작성한 댓글</h2>

         <div className="grid gap-4">
            {comments.map((comment) => (
               <Card
                  key={comment.id}
                  className="hover:shadow-lg transition-shadow"
               >
                  <CardContent className="pt-6">
                     <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">
                           {comment.postTitle}
                        </h3>
                        <span className="text-sm text-gray-500">
                           {comment.createdAt}
                        </span>
                     </div>
                     <p className="text-gray-600">{comment.content}</p>
                  </CardContent>
               </Card>
            ))}
         </div>
      </div>
   )
}
