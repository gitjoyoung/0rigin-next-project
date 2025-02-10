import Profile from './Profile'
import ProfileMenu from './ProfileMenu'

export default async function MyPage({ session }) {
   const { user } = session

   return (
      <section className="flex flex-wrap border border-black rounded-lg overflow-hidden h-[100vh]">
         <div className="p-2 flex flex-col items-start sm:min:w-full min-w-[350px] px-4">
            <div className="h-8 text-left">메뉴</div>
            <Profile name={user.name} email={user.email} />
            <ProfileMenu />
         </div>
         <div className="sm:flex-1 w-full   bg-gray-200 overflow-hidden">
            <h1 className="font-bold">내가 작성한 글</h1>
         </div>
      </section>
   )
}
