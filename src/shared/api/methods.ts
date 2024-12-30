import { api } from './instance'
import { ApiResponse } from './types'

export const apiMethods = {
   async get<T>(
      path: string,
      params?: Record<string, string>,
   ): Promise<ApiResponse<T>> {
      return api.request<T>({ method: 'GET', path, params })
   },

   async post<T>(path: string, data: any): Promise<ApiResponse<T>> {
      return api.request<T>({ method: 'POST', path, data })
   },

   async put<T>(path: string, data: any): Promise<ApiResponse<T>> {
      return api.request<T>({ method: 'PUT', path, data })
   },

   async delete<T>(path: string, id: string): Promise<ApiResponse<T>> {
      return api.request<T>({ method: 'DELETE', path, params: { id } })
   },
}

// // GET 요청
// const fetchPosts = async () => {
//   const response = await apiMethods.get<Post[]>('posts')
//   return response.data
// }

// // POST 요청
// const createPost = async (postData: CreatePostDTO) => {
//   const response = await apiMethods.post<Post>('posts', postData)
//   return response.data
// }

// // PUT 요청
// const updatePost = async (postData: UpdatePostDTO) => {
//   const response = await apiMethods.put<Post>('posts', postData)
//   return response.data
// }

// // DELETE 요청
// const deletePost = async (postId: string) => {
//   const response = await apiMethods.delete<{ id: string }>('posts', postId)
//   return response.data
// }
