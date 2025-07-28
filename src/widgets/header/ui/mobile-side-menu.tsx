'use client'

import {
   useAuthActions,
   useAuthState,
} from '@/app/providers/auth-client-provider'
import { ROUTE_LOGIN, ROUTE_MY_PAGE, ROUTE_SIGN } from '@/constants/pathname'
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
} from '@/shared/shadcn/ui/alert-dialog'
import { Avatar } from '@/shared/shadcn/ui/avatar'
import { Button } from '@/shared/shadcn/ui/button'
import {
   Sheet,
   SheetClose,
   SheetContent,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from '@/shared/shadcn/ui/sheet'
import { cn } from '@/shared/utils/cn'
import { ChevronDown, Loader2, LogOut, Menu } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { HEADER_NAV_LIST } from '../constant/header-menu'

export default function MobileSideMenu({ className }: { className?: string }) {
   const [isOpen, setIsOpen] = useState(false)
   const [expandedMenus, setExpandedMenus] = useState<string[]>([])
   const [showLogoutDialog, setShowLogoutDialog] = useState(false)
   const [isLoggingOut, setIsLoggingOut] = useState(false)
   const { status, user, profile } = useAuthState()
   const { logout } = useAuthActions()

   const toggleMenu = (menuId: string) => {
      setExpandedMenus((prev) =>
         prev.includes(menuId)
            ? prev.filter((id) => id !== menuId)
            : [...prev, menuId],
      )
   }

   const handleLogout = async () => {
      setIsLoggingOut(true)
      await logout()
      setShowLogoutDialog(false)
      setIsOpen(false)
      setIsLoggingOut(false)
   }

   return (
      <>
         <div className={cn(className, 'flex items-center justify-center')}>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
               <SheetTrigger asChild>
                  <Menu />
               </SheetTrigger>
               <SheetContent
                  side="right"
                  className="w-[250px] p-0 gap-0 flex flex-col"
               >
                  <SheetHeader className="m-2 flex items-center justify-center">
                     <SheetTitle>메뉴</SheetTitle>
                  </SheetHeader>

                  <div className="flex flex-col flex-1 space-y-0">
                     <div className="flex flex-col items-center justify-center p-2 border-b ">
                        {status === 'loading' && (
                           <div className="w-16 h-8 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
                        )}
                        {(status === 'authed' || status === 'needsProfile') && (
                           <div className="flex flex-col items-center justify-center gap-3 w-full">
                              {/* 사용자 프로필 정보 */}
                              <div className="flex items-center gap-3 w-full p-4 bg-gray-50 dark:bg-primary-foreground rounded-lg">
                                 <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                                    <Avatar className="w-5 h-5 text-primary-foreground" />
                                 </div>
                                 <div className="flex-1 min-w-0">
                                    <SheetClose asChild>
                                       <Link
                                          href={ROUTE_MY_PAGE}
                                          className="text-sm font-medium truncate "
                                       >
                                          {profile?.nickname ||
                                             '닉네임을 설정해주세요'}{' '}
                                          <span className="text-xs text-muted-foreground w-2">
                                             &gt;
                                          </span>
                                       </Link>
                                    </SheetClose>
                                    <p className="text-xs text-muted-foreground truncate">
                                       {user?.email}
                                    </p>
                                 </div>
                              </div>
                           </div>
                        )}
                        {status === 'unauth' && (
                           <div className="flex items-center justify-center gap-2 w-full  ">
                              <SheetClose asChild>
                                 <Link href={ROUTE_LOGIN} className="flex-1">
                                    <Button
                                       variant="outline"
                                       className="w-full"
                                    >
                                       로그인
                                    </Button>
                                 </Link>
                              </SheetClose>
                              <SheetClose asChild>
                                 <Link href={ROUTE_SIGN} className="flex-1">
                                    <Button
                                       variant="outline"
                                       className="w-full"
                                    >
                                       회원가입
                                    </Button>
                                 </Link>
                              </SheetClose>
                           </div>
                        )}
                     </div>

                     <nav className="flex flex-col flex-1">
                        {HEADER_NAV_LIST.map((item) => (
                           <div key={item.id}>
                              {item.submenuGroups ? (
                                 // 하위메뉴가 있는 경우
                                 <div>
                                    <button
                                       onClick={() => toggleMenu(item.id)}
                                       className="w-full flex items-center justify-between border-b px-4 py-3 hover:bg-accent hover:text-accent-foreground"
                                    >
                                       {item.title}
                                       <ChevronDown
                                          className={cn(
                                             'h-4 w-4 transition-transform duration-200',
                                             expandedMenus.includes(item.id) &&
                                                'rotate-180',
                                          )}
                                       />
                                    </button>
                                    {expandedMenus.includes(item.id) && (
                                       <div className="bg-gray-50 py-1 dark:bg-gray-800">
                                          {item.submenuGroups?.map((group) => (
                                             <div
                                                key={group.id}
                                                className="py-1"
                                             >
                                                {group.title && (
                                                   <h4 className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                                      {group.title}
                                                   </h4>
                                                )}
                                                {group.items.map((subItem) => (
                                                   <SheetClose
                                                      asChild
                                                      key={subItem.id}
                                                   >
                                                      <Link
                                                         href={subItem.url}
                                                         className="flex items-center gap-3 py-2 pl-6 pr-4 text-sm hover:bg-accent hover:text-accent-foreground"
                                                      >
                                                         <subItem.icon className="h-4 w-4 text-muted-foreground" />
                                                         <span>
                                                            {subItem.title}
                                                         </span>
                                                      </Link>
                                                   </SheetClose>
                                                ))}
                                             </div>
                                          ))}
                                       </div>
                                    )}
                                 </div>
                              ) : (
                                 // 하위메뉴가 없는 경우
                                 <SheetClose asChild>
                                    <Link
                                       href={item.url || '#'}
                                       className="border-b px-4 py-3 hover:bg-accent hover:text-accent-foreground"
                                    >
                                       {item.title}
                                    </Link>
                                 </SheetClose>
                              )}
                           </div>
                        ))}
                     </nav>

                     {/* 로그아웃 버튼 - 하단 고정 */}
                     {(status === 'authed' || status === 'needsProfile') && (
                        <div className="mt-auto border-t ">
                           <SheetClose asChild>
                              <Button
                                 variant="link"
                                 onClick={() => setShowLogoutDialog(true)}
                                 className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950 p-4"
                                 disabled={isLoggingOut}
                              >
                                 {isLoggingOut ? (
                                    <>
                                       <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                       로그아웃 중...
                                    </>
                                 ) : (
                                    <>
                                       <LogOut className="w-4 h-4 mr-2" />
                                       로그아웃
                                    </>
                                 )}
                              </Button>
                           </SheetClose>
                        </div>
                     )}
                  </div>
               </SheetContent>
            </Sheet>
         </div>
         <AlertDialog
            open={showLogoutDialog}
            onOpenChange={setShowLogoutDialog}
         >
            <AlertDialogContent>
               <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2">
                     <LogOut className="h-5 w-5 text-red-600" />
                     <p>로그아웃</p>
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                     정말로 로그아웃하시겠습니까?
                  </AlertDialogDescription>
               </AlertDialogHeader>
               <AlertDialogFooter>
                  <AlertDialogCancel disabled={isLoggingOut}>
                     취소
                  </AlertDialogCancel>
                  <AlertDialogAction
                     onClick={handleLogout}
                     className="bg-red-600 hover:bg-red-700 text-white"
                     disabled={isLoggingOut}
                  >
                     {isLoggingOut ? (
                        <>
                           <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                           로그아웃 중...
                        </>
                     ) : (
                        '로그아웃'
                     )}
                  </AlertDialogAction>
               </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialog>
      </>
   )
}
