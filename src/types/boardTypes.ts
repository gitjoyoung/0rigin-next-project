interface Post {
   id: string
   nickname: string
   content: string
   createdAt: Date
   number: number
   title: string
   category: string
}

interface BoardReadData {
   title: string
   nickname: string
   like: number
   dislike: number
   content: string
   createdAt: string
   postId: string
}

export type { BoardReadData, Post }
