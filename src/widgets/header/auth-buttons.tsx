import { ROUTE_LOGIN, ROUTE_MY_PAGE, ROUTE_SIGN } from '@/constants/pathname'
import { auth, signOut } from '@/shared/actions/auth-action'
import { Button } from '@/shared/shadcn/ui/button'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function AuthButtons() {
   const session = await auth()
   const isAuthenticated = !!session

   return (
      <section className="flex items-end gap-5">
         {!isAuthenticated ? (
            <div className="flex gap-2 text-xs">
               <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="dark:bg-white bg-black text-white dark:text-black"
               >
                  <Link href={ROUTE_LOGIN}>로그인</Link>
               </Button>
               <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="dark:bg-white bg-black text-white dark:text-black"
               >
                  <Link href={ROUTE_SIGN}>회원가입</Link>
               </Button>
            </div>
         ) : (
            <div className="flex gap-2 text-xs">
               <form
                  action={async () => {
                     'use server'
                     await signOut()
                     redirect('/')
                  }}
               >
                  <Button
                     type="submit"
                     className="dark:bg-white bg-black text-white dark:text-black"
                     size="sm"
                     variant="outline"
                  >
                     <p>로그아웃</p>
                  </Button>
               </form>
               <Button asChild size="sm" variant="outline">
                  <Link
                     href={ROUTE_MY_PAGE}
                     className="dark:bg-white bg-black text-white dark:text-black"
                  >
                     마이페이지
                  </Link>
               </Button>
            </div>
         )}
      </section>
   )
}
