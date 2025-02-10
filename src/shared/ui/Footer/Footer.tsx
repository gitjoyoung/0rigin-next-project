import { ROUTE_CONTACT, ROUTE_HELP } from '@/constants/pathname'
import Link from 'next/link'

const FOOTER_NAV = Object.freeze([
   { id: 'inquiry', name: '1:1문의', link: ROUTE_CONTACT },
   { id: 'customerService', name: '고객센터', link: ROUTE_HELP },
   { id: 'contact', name: 'contact', link: ROUTE_CONTACT },
])
export default function Footer() {
   return (
      <div className="text-xs flex flex-col items-center justify-center gap-2  bottom-0  bg-gray-100 p-4 w-full border-t-2 border-black">
         <p className="">Origin project</p>
         <ul className="  flex gap-4 flex-wrap font-semibold">
            {FOOTER_NAV.map(({ name, link, id }) => (
               <li className="" key={id}>
                  <Link href={link}>{name}</Link>
               </li>
            ))}
         </ul>
         <p>Copyright © Origin Corp. All Rights Reserved.</p>
      </div>
   )
}
