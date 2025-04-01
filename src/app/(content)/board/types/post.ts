export interface PostContent {
   type: string
   content: string
}

export interface Post {
   id: string
   title: string
   content: PostContent
   author: {
      id: string
      name: string
      email: string
   }
   created_at: string
   updated_at: string
   views: number
   likes: number
   comments: number
   tags?: string[]
   category?: string
   status: 'published' | 'draft' | 'archived' | 'deleted' // published: 공개된 게시물, draft: 임시저장된 게시물, archived: 보관된 게시물, deleted: 삭제된 게시물
   attachments?: {
      id: string
      url: string
      type: string
      name: string
   }[]
}

export interface CreatePostInput {
   title: string
   content: PostContent
   tags?: string[]
   category?: string
   attachments?: File[]
}

export interface UpdatePostInput extends Partial<CreatePostInput> {
   id: string
   status?: Post['status']
}
