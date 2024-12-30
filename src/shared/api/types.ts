export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export interface ApiConfig {
   method: ApiMethod
   path: string
   data?: any
   params?: Record<string, string>
}

export interface ApiResponse<T = any> {
   data: T
   status: number
   message: string
}
