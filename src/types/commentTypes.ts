interface CommentData {
   comment: string
   createdAt: string
   id: string
   nickname: string
   postId: string
}

interface CreateCommentData {
   postId: string
   nickname: string
   password: string
   comment: string
}
export type { CommentData, CreateCommentData }
