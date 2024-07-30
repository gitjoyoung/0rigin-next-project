export interface Login {
   displayName: string | null
   email: string | null
   emailVerified: boolean
   phoneNumber: string | null
   photoURL: string | null
   uid: string
   accessToken?: string
}

export interface UserData {
   email: string
   password: string
   gender: string
}
