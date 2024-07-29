import Link from 'next/link'

interface Props {
   href: string
   children: React.ReactNode
}

export default function CustomLink({ href, children }: Props) {
   return (
      <Link className="px-2 py-1 border border-black" href={href}>
         {children}
      </Link>
   )
}
