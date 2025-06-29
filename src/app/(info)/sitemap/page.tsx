// src/app/(info)/sitemap/page.tsx
export const dynamic = 'force-static'

import { SITEMAP } from '@/constants/site-map'
import Link from 'next/link'

export default function Page() {
   return (
      <div className="container mx-auto py-16 max-w-5xl">
         <h1 className="text-3xl font-bold mb-10">0RIGIN 사이트 맵</h1>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SITEMAP.map((section) => (
               <div key={section.category}>
                  <h2 className="text-lg font-semibold mb-4">
                     {section.category}
                  </h2>
                  <ul className="space-y-2">
                     {section.links.map((link) => (
                        <li key={link.href}>
                           <Link
                              href={link.href}
                              className="text-blue-600 hover:underline"
                           >
                              {link.name}
                           </Link>
                        </li>
                     ))}
                  </ul>
               </div>
            ))}
         </div>
      </div>
   )
}
