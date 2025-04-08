type Gender = 'man' | 'woman' | 'etc'

export interface IProfile {
   id: string
   email: string
   nickname: string
   gender: Gender
   is_email_verified: boolean
   is_active: boolean
   created_at: string
   last_login_at: string | null
}
