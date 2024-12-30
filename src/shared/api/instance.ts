import { db } from '../config/firebase'
import {
   collection,
   getDocs,
   query,
   where,
   addDoc,
   updateDoc,
   deleteDoc,
   doc,
} from 'firebase/firestore'
import { ApiConfig, ApiResponse } from './types'

export class ApiInstance {
   private static instance: ApiInstance
   private constructor() {}

   static getInstance(): ApiInstance {
      if (!ApiInstance.instance) {
         ApiInstance.instance = new ApiInstance()
      }
      return ApiInstance.instance
   }

   async request<T>({
      method,
      path,
      data,
      params,
   }: ApiConfig): Promise<ApiResponse<T>> {
      try {
         const collectionRef = collection(db, path)

         switch (method) {
            case 'GET': {
               const querySnapshot = await getDocs(collectionRef)
               const result = querySnapshot.docs.map((doc) => ({
                  id: doc.id,
                  ...doc.data(),
               }))
               return { data: result as T, status: 200, message: 'Success' }
            }

            case 'POST': {
               const docRef = await addDoc(collectionRef, data)
               return {
                  data: { id: docRef.id, ...data } as T,
                  status: 201,
                  message: 'Created',
               }
            }

            case 'PUT': {
               if (!data.id) throw new Error('Document ID is required')
               const docRef = doc(db, path, data.id)
               await updateDoc(docRef, data)
               return {
                  data: data as T,
                  status: 200,
                  message: 'Updated',
               }
            }

            case 'DELETE': {
               if (!params?.id) throw new Error('Document ID is required')
               const docRef = doc(db, path, params.id)
               await deleteDoc(docRef)
               return {
                  data: { id: params.id } as T,
                  status: 200,
                  message: 'Deleted',
               }
            }

            default:
               throw new Error(`Unsupported method: ${method}`)
         }
      } catch (error) {
         throw new Error(`API Error: ${error.message}`)
      }
   }
}

export const api = ApiInstance.getInstance()
