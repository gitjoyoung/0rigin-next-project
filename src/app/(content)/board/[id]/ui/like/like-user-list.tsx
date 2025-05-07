import { Avatar, AvatarFallback, AvatarImage } from '@/shared/shadcn/ui/avatar'
import { Button } from '@/shared/shadcn/ui/button'
import { ScrollArea } from '@/shared/shadcn/ui/scroll-area'
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from '@/shared/shadcn/ui/tooltip'
import { AnimatePresence, motion } from 'framer-motion'
import { Users } from 'lucide-react'
import { useState } from 'react'
import { usePostLikes } from './hooks/use-post-likes'

interface Props {
   postId: string
}

export default function LikeUserList({ postId }: Props) {
   const [showLikedUsers, setShowLikedUsers] = useState(false)
   const { likesCount, likedUsers } = usePostLikes(postId)

   if (likesCount === 0) return null

   return (
      <>
         <TooltipProvider>
            <Tooltip>
               <TooltipTrigger asChild>
                  <Button
                     variant="ghost"
                     size="sm"
                     className="text-xs text-muted-foreground hover:text-foreground"
                     onClick={() => setShowLikedUsers(!showLikedUsers)}
                  >
                     <Users className="h-4 w-4 mr-1" />
                     좋아요한 사용자 보기
                  </Button>
               </TooltipTrigger>
               <TooltipContent>
                  <p>좋아요한 사용자 목록 보기</p>
               </TooltipContent>
            </Tooltip>
         </TooltipProvider>

         <AnimatePresence>
            {showLikedUsers && (
               <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-full max-w-xs"
               >
                  <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                     <div className="space-y-4">
                        {likedUsers
                           .filter((like) => like.user_id && like.users)
                           .map((like) => (
                              <div
                                 key={like.user_id}
                                 className="flex items-center space-x-2"
                              >
                                 <Avatar className="h-8 w-8">
                                    <AvatarImage
                                       src={
                                          like.users?.raw_user_meta_data
                                             ?.avatar_url || undefined
                                       }
                                       alt={
                                          like.users?.raw_user_meta_data
                                             ?.name || '익명 사용자'
                                       }
                                    />
                                    <AvatarFallback>
                                       {like.users?.raw_user_meta_data
                                          ?.name?.[0] || '익'}
                                    </AvatarFallback>
                                 </Avatar>
                                 <span className="text-sm font-medium">
                                    {like.users?.raw_user_meta_data?.name ||
                                       '익명 사용자'}
                                 </span>
                              </div>
                           ))}
                        {likedUsers.filter((like) => like.anon_key).length >
                           0 && (
                           <div className="text-sm text-muted-foreground pt-2 border-t">
                              비회원{' '}
                              {
                                 likedUsers.filter((like) => like.anon_key)
                                    .length
                              }
                              명
                           </div>
                        )}
                     </div>
                  </ScrollArea>
               </motion.div>
            )}
         </AnimatePresence>
      </>
   )
}
