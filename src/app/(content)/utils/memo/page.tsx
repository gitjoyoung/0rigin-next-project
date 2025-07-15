import Memo from '@/widgets/util-widget/memo'
import type { Metadata } from 'next'

export const metadata: Metadata = {
   title: '메모',
   description: '0RIGIN(제로리진) 메모 페이지',
}

export default function Page() {
   return <Memo />
}
