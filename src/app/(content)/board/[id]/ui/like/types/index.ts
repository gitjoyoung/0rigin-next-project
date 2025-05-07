export interface RawUserMetaData {
   name?: string
   avatar_url?: string
}

export interface LikedUser {
   id: string
   raw_user_meta_data: RawUserMetaData
}

export interface PostLike {
   user_id: string | null
   anon_key: string | null
   nickname: string
   users?: LikedUser
}

export interface PostLikesResponse {
   likesCount: number
   likedUsers: PostLike[]
}
