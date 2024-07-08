// 공통 인터페이스 정의
interface BasePost {
   id?: string
   title: string
   nickname?: string
   markdown?: string
   thumbnail?: string
}

// 개별 인터페이스 정의
interface Post extends BasePost {
   content: string
   createdAt: string
   comment?: number
   category?: string
   like?: number
   dislike?: number
   views?: number
   deleted?: boolean
}

interface CreatePostData extends BasePost {
   content: string
   password?: string
   summary?: string
}

interface TopPost extends BasePost {
   like?: number
   views?: number
   summary?: string
}

// 타입 내보내기
export type { Post, CreatePostData, TopPost }
