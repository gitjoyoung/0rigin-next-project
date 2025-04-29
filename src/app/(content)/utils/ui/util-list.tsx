import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
} from '@/shared/shadcn/ui/card'
import { ImageIcon } from 'lucide-react'
import Link from 'next/link'

const utilList = [
   {
      name: '이미지 변환기',
      href: '/utils/image-converter',
      description: '이미지 포맷을 변환하고 크기를 조정할 수 있습니다.',
      icon: <ImageIcon className="h-6 w-6" />,
   },
   // {
   //    name: '맞춤법 검사기',
   //    href: '/utils/text-converter',
   //    description: '맞춤법을 검사할 수 있습니다.',
   //    icon: <FileTextIcon className="h-6 w-6" />,
   // },
   // {
   //    name: '계산기',
   //    href: '/utils/calculator',
   //    description: '간단한 수학 계산을 수행합니다.',
   //    icon: <CalculatorIcon className="h-6 w-6" />,
   // },
]

export default function UtilList() {
   return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
         {utilList.map((util) => (
            <Link key={util.href} href={util.href} className="block">
               <Card className="h-full hover:bg-accent transition-colors">
                  <CardHeader className="flex flex-row items-center gap-4">
                     {util.icon}
                     <CardTitle>{util.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                     <p className="text-sm text-muted-foreground">
                        {util.description}
                     </p>
                  </CardContent>
               </Card>
            </Link>
         ))}
      </div>
   )
}
