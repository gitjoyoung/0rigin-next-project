import { Metadata } from 'next'

export const metadata: Metadata = {
   title: '소개',
   description: '0RIGIN(제로리진) 소개 페이지입니다.',
}
type Props = {
   children: React.ReactNode
}
export default function layout({ children }: Props) {
   return <>{children}</>
}
