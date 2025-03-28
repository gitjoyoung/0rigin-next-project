import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from '@/shared/shadcn/ui/accordion'
import { Button } from '@/shared/shadcn/ui/button'

export default function HelpPage() {
   return (
      <div className="container mx-auto py-8 space-y-8">
         <h1 className="text-3xl font-bold text-center">도움말</h1>

         <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
               <AccordionTrigger>서비스 이용 방법</AccordionTrigger>
               <AccordionContent>
                  서비스 이용 방법에 대한 상세 설명이 들어갑니다.
               </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
               <AccordionTrigger>자주 묻는 질문</AccordionTrigger>
               <AccordionContent>
                  자주 묻는 질문에 대한 답변이 들어갑니다.
               </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
               <AccordionTrigger>문의하기</AccordionTrigger>
               <AccordionContent>
                  문의하기 방법과 절차에 대한 안내가 들어갑니다.
               </AccordionContent>
            </AccordionItem>
         </Accordion>

         <div className="flex justify-center">
            <Button variant="default" size="lg">
               문의하기
            </Button>
         </div>
      </div>
   )
}
