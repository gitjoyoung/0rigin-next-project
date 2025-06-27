import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
   title: 'Origin 커뮤니티 게시판',
   description: 'Origin 제로리진 커뮤니티 게시판입니다.',
}

export default function BoardPage() {
   redirect('/board/latest')
}
