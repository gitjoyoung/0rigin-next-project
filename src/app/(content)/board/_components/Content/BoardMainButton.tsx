'use client'

import { useRouter } from 'next/navigation'

interface Props {
   route: string
   title: string
}
export default function BoardMainButton({ route, title }: Props) {
   const router = useRouter()
   return (
      <button
         onClick={() => router.push(route)}
         type="button"
         className=" right-0 border border-black px-4 py-2 font-bold shadow-md  flex items-center"
      >
         {title}
      </button>
   )
}
