'use client'

import { SupabaseBrowserClient } from '@/shared/lib/supabase/supabase-browser-client'
import { Button } from '@/shared/shadcn/ui/button'
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/shared/shadcn/ui/table'
import { useQuery } from '@tanstack/react-query'
import { Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'

interface Post {
   id: string
   title: string
   content: string
   createdAt: string
   likes: number
   comments: number
   category: string
}

export default function MyPosts() {
   const supabase = SupabaseBrowserClient()

   const {
      data: posts = [],
      isLoading,
      error,
   } = useQuery({
      queryKey: ['my-posts'],
      queryFn: async () => {
         const { data: user } = await supabase.auth.getUser()
         if (!user.user?.id) return []

         const { data } = await supabase
            .from('posts')
            .select('*')
            .eq('user_id', user.user.id)

         return data || []
      },
   })

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
                           <Link href={`/board/${post.category}/${post.id}`}>
                              {post.title}
                           </Link>
                        </TableCell>
                        <TableCell>{post.createdAt}</TableCell>
                        <TableCell className="text-center">
                           {post.likes}
                        </TableCell>
                        <TableCell className="text-center">
                           {post.comments}
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
