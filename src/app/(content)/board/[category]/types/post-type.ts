export interface IPostContent {
   markdown: string
   html?: string // 서버에서 미리 변환된 HTML 콘텐츠
}

export interface IPost {
   id: string
   title: string
   slug: string
   excerpt: string
   content: IPostContent
   thumbnail: string
   author_id: string
   password: string
   view_count: number
   reading_time: number
   tags: string[]
   is_pinned: boolean
   category: string
   status: 'published' | 'draft' | 'archived' | 'deleted' // published: 공개된 게시물, draft: 임시저장된 게시물, archived: 보관된 게시물, deleted: 삭제된 게시물
   nickname: string
   summary: string
   created_at: string
   updated_at: string
   likes: number
   comments: number
   is_liked: boolean
}

export interface ICreatePostInput {
   title: string
   content: IPostContent
   tags?: string[]
   category?: string
   attachments?: File[]
}

export interface UpdatePostInput extends Partial<ICreatePostInput> {
   id: string
   status?: IPost['status']
}

export interface IPostListItem extends IPost {
   likes: number
   comments: number
   is_liked: boolean
}
