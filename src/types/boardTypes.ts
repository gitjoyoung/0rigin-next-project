interface Post {
   id: string
   nickname: string
   content: string
   createdAt: string
   title: string
   comments?: number
   category?: string
   like?: number
   dislike?: number
   views?: number
}

interface CreatePostData {
   nickname: string
   password?: string
   title: string
   content: string
}

interface EditPostData {
   postId: string
   title: string
   content: string
   password: string
   id: string
}

export type { Post, CreatePostData, EditPostData }
