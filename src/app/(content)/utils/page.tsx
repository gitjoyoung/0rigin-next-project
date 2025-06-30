import { Metadata } from 'next'
import UtilList from './ui/util-list'

export const metadata: Metadata = {
   title: '유틸리티 메뉴',
   description: '0RIGIN(제로리진) 유틸리티 메뉴 페이지',
}

export default function page() {
   return (
      <section className="flex flex-col gap-4 mb-10">
         <UtilList />
      </section>
   )
}
