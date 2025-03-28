'use client'

import { Button } from '@/shared/shadcn/ui/button'
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
} from '@/shared/shadcn/ui/card'
import Image from 'next/image'
import { toast } from 'sonner'

const CONTACT_INFO = {
   title: '제휴 문의',
   subTitle: '광고 및 제휴 문의 언제든 연락해주세요!',
   content: '우리는 함께 성장합니다.',
   content2: '문의사항이나 제안사항이 있으시다면 언제든 연락해주세요.',
   email: 'admin@0rigin.com',
   address: '서울특별시 금천구',
   map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3172.8283489123456!2d126.97812345678901!3d37.56612345678901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca2eaa7e0e0e0%3A0x0!2z7ISc7Jq47Yq567OE7IucIOyiheuhnOq1rA!5e0!3m2!1sko!2skr!4v1234567890',
}

export default function Contact() {
   const handleCopy = (text: string, type: string) => {
      navigator.clipboard.writeText(text)
      toast.success(`${type}이(가) 클립보드에 복사되었습니다.`)
   }

   return (
      <section className="container mx-auto px-4 py-12">
         <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
               <h1 className="text-4xl font-bold tracking-tight">
                  {CONTACT_INFO.title}
               </h1>
               <p className="text-muted-foreground">{CONTACT_INFO.subTitle}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
               <Card>
                  <CardHeader className="p-0">
                     <div className="relative h-64 w-full">
                        <Image
                           src="/mascot/winksaurus.png"
                           fill
                           alt="winksaurus mascot"
                           className="object-cover rounded-t-lg"
                           priority
                        />
                     </div>
                  </CardHeader>
                  <CardContent className="p-6">
                     <CardTitle className="text-xl mb-4">
                        {CONTACT_INFO.content}
                     </CardTitle>
                     <p className="text-muted-foreground">
                        {CONTACT_INFO.content2}
                     </p>
                  </CardContent>
               </Card>

               <div className="space-y-6">
                  <Card>
                     <CardHeader>
                        <CardTitle>이메일</CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className="flex items-center justify-between">
                           <p className="text-muted-foreground">
                              {CONTACT_INFO.email}
                           </p>
                           <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                 handleCopy(CONTACT_INFO.email, '이메일')
                              }
                           >
                              복사
                           </Button>
                        </div>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardHeader>
                        <CardTitle>주소</CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className="flex items-center justify-between">
                           <p className="text-muted-foreground">
                              {CONTACT_INFO.address}
                           </p>
                           <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                 handleCopy(CONTACT_INFO.address, '주소')
                              }
                           >
                              복사
                           </Button>
                        </div>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardHeader>
                        <CardTitle>위치</CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className="aspect-video w-full relative">
                           <iframe
                              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3172.8283489123456!2d126.97812345678901!3d37.56612345678901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca2eaa7e0e0e0%3A0x0!2z7ISc7Jq47Yq567OE7IucIOyiheuhnOq1rA!5e0!3m2!1sko!2skr!4v1234567890"
                              width="100%"
                              height="100%"
                              style={{ border: 0 }}
                              allowFullScreen
                              loading="lazy"
                              referrerPolicy="no-referrer-when-downgrade"
                              className="rounded-lg"
                           />
                        </div>
                     </CardContent>
                  </Card>
               </div>
            </div>
         </div>
      </section>
   )
}
