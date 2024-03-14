import { db } from '@/lib/firebase'
import { Post } from '@/types/boardTypes'
import { collection, getDocs, query, where } from 'firebase/firestore'

export const fetchMyPosts = async (userId: string): Promise<Post[]> => {
   const postsRef = collection(db, 'posts')
   const q = query(postsRef, where('userId', '==', userId))
   const querySnapshot = await getDocs(q)
   const posts = []
   querySnapshot.forEach((doc) => {
      posts.push({ ...doc.data(), id: doc.id })
   })
   return posts
}
