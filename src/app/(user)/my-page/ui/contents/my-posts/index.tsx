'use client'

import { Button } from '@/shared/shadcn/ui/button'
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/shared/shadcn/ui/table'
import dayjs from 'dayjs'
import { Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useMyPosts } from './hooks/use-my-posts'

export default function MyPosts() {
   const { data: posts, isLoading, error } = useMyPosts()

   if (isLoading) return <div>로딩 중...</div>
   if (error) return <div>에러가 발생했습니다.</div>

   return (
      <div className="space-y-4">
         <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">내가 작성한 글</h2>
         </div>

         <div className="rounded-md border">
            <Table>
               <TableHeader>
                  <TableRow>
                     <TableHead className="w-[50%]">제목</TableHead>
                     <TableHead>작성일</TableHead>
                     <TableHead className="text-center">좋아요</TableHead>
                     <TableHead className="text-center">댓글</TableHead>
                     <TableHead className="text-center w-[120px]">
                        관리
                     </TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {posts.map((post) => (
                     <TableRow key={post.id} className="hover:bg-gray-50">
                        <TableCell>
                           <Link
                              href={`/board/${post.category_id || 'latest'}/${post.id}`}
                           >
                              {post.title}
                           </Link>
                        </TableCell>
                        <TableCell>
                           {dayjs(post.created_at).format('YYYY-MM-DD')}
                        </TableCell>
                        <TableCell className="text-center">
                           {post.view_count || 0}
                        </TableCell>

                        <TableCell>
                           <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                 <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                 variant="ghost"
                                 size="sm"
                                 className="text-red-600 hover:text-red-700"
                              >
                                 <Trash2 className="h-4 w-4" />
                              </Button>
                           </div>
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </div>
      </div>
   )
}
