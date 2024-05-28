export interface Login {
   id: string | null
   name?: string | null
   email: string | null
   nickname?: string | null
   token?: string | null
}

export interface UserData {
   email: string
   password: string
   gender: string
}
