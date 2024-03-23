import Link from 'next/link'

interface Props {
   href: string
   children: React.ReactNode
}

export default function CustomLink({ href, children }: Props) {
   return (
      <Link className="px-2 py-2 border" href={href}>
         {children}
      </Link>
   )
}
