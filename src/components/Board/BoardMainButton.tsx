import Link from 'next/link'

interface Props {
   route: string
   title: string
}
export default function BoardMainButton({ route, title }: Props) {
   return (
      <div className=" right-0 border border-black  shadow-md  flex items-center">
         <Link href={route} className="px-4 py-2 font-bold">
            {title}
         </Link>
      </div>
   )
}
