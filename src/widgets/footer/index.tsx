import {
   ROUTE_HELP,
   ROUTE_INQUIRY,
   ROUTE_INTRODUCE,
   ROUTE_SITEMAP,
} from '@/constants/pathname'
import Link from 'next/link'

const FOOTER_NAV = Object.freeze([
   { id: 'introduce', name: '소개', link: ROUTE_INTRODUCE },
   { id: 'inquiry', name: '1:1문의', link: ROUTE_INQUIRY },
   { id: 'help', name: '도움말', link: ROUTE_HELP },
   { id: 'sitemap', name: '사이트맵', link: ROUTE_SITEMAP },
])
export default function Footer() {
   return (
      <div className="text-xs flex flex-col items-center justify-center gap-2   p-4 w-full border-t-2 border-black">
         <ul className="flex flex-wrap font-semibold divide-x divide-black dark:divide-white">
            {FOOTER_NAV.map(({ name, link, id }, index) => (
               <li key={id} className="px-1.5 first:pl-0 last:pr-0">
                  <Link
                     href={link}
                     className="hover:text-gray-900 dark:hover:text-white"
                  >
                     {name}
                  </Link>
               </li>
            ))}
         </ul>
         <p className="">Contact Us : admin@0rigin.com</p>
         <p>Copyright © Origin Corp. All Rights Reserved.</p>
      </div>
   )
}
