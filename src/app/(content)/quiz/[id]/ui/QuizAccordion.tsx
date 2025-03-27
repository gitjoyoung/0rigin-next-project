import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from '@/shared/shadcn/ui/accordion'
import { Icons } from '@/shared/ui/icons'

interface Props {
   content: string
}
export default function QuizAccordion({ content }: Props) {
   const ACCORDION_DATA = {
      title: '힌트',
      content,
   }
   return (
      <Accordion type="single" collapsible className="w-full">
         <AccordionItem value="item-1" className="border-none">
            <AccordionTrigger>
               <div className="flex gap-2 items-center">
                  <Icons.fileQuestion size={20} />
                  <h1>{ACCORDION_DATA.title}</h1>
               </div>
            </AccordionTrigger>
            <AccordionContent>
               <p className="font-semibold leading-7 break-words whitespace-pre-line">
                  {ACCORDION_DATA.content}
               </p>
            </AccordionContent>
         </AccordionItem>
      </Accordion>
   )
}
