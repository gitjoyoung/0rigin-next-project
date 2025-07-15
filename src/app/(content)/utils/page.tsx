import UtilList from '@/widgets/util-widget/util-list'
import { Metadata } from 'next'

export const metadata: Metadata = {
   title: '유틸리티 메뉴',
   description: '0RIGIN(제로리진) 유틸리티 메뉴 페이지',
}

export default function page() {
   return <UtilList />
}
