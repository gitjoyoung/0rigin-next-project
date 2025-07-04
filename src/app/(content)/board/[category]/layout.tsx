import { Metadata } from 'next'

export const metadata: Metadata = {
   title: '게시판',
   description:
      '0RIGIN(제로리진)에서 누구나 자유롭게 소통 가능한 게시판입니다.',
}

export default async function layout({
   children,
}: {
   children: React.ReactNode
}) {
   return <section className="w-full">{children}</section>
}
