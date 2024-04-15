interface Post {
   id: string
   nickname: string
   content: string
   createdAt: string
   title: string
   comment?: number
   category?: string
   like?: number
   dislike?: number
   views?: number
   markdown?: string
   thumbnail?: string
   deleted?: boolean
}

interface CreatePostData {
   nickname: string
   password?: string
   title: string
   content: string
   markdown?: string
   thumbnail?: string
   summary?: string
}

interface EditPostData {
   id: string
   title: string
   nickname?: string
   markdown?: string
}
interface TopPost {
   id: string
   nickname?: string
   title: string
   like?: number
   views?: number
   thumbnail?: string
   summary?: string
}

export type { Post, CreatePostData, EditPostData, TopPost }
