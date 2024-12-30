import { auth } from '@/auth'
import MyPage from './_components/MyPage'

export default async function page() {
   const session = await auth()
   return <MyPage session={session} />
}
