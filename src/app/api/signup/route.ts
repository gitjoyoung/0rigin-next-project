import { fetchSignUp } from '@/service/auth/fetchSignUp'

export async function POST(request: Request) {
   const { email, password, gender } = await request.json()
   const firebaseSignUp = await fetchSignUp(email, password, gender)
   return new Response(JSON.stringify(firebaseSignUp))
}
