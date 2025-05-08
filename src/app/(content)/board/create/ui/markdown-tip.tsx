import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from '@/shared/shadcn/ui/accordion'
import { Icons } from '@/shared/ui/icons'

const ACCORDION_DATA = {
   title: 'MarkDown 문법 요약',
   content: `# 제목: # 사용\n**굵은 글씨**: ** 또는 __ 사용\n*이탤릭체*: * 또는 _ 사용\n- 목록: - 또는 * 사용\n\`코드\`: \` 사용, 여러 줄은 ~~~ 사용\n> 인용문: > 사용\n[링크](URL): [텍스트](URL) 사용\n이미지: ![텍스트](이미지 URL) 사용\n수평선: ---, ***, ___ 사용\n체크리스트: - [ ] 또는 - [x] 사용\n표: |로 구분`,
}

export default function MarkDownTip() {
   return (
      <Accordion
         type="single"
         collapsible
         className="w-full bg-transparent dark:bg-slate-50 border dark:border-slate-200 rounded-sm "
      >
         <AccordionItem value="item-1" className="border-none">
            <AccordionTrigger className="h-5 hover:no-underline">
               <div className="flex gap-2 items-center text-slate-700">
                  <Icons.fileQuestion size={20} className="text-slate-500" />
                  <h1 className="text-base font-medium">
                     {ACCORDION_DATA.title}
                  </h1>
               </div>
            </AccordionTrigger>
            <AccordionContent>
               <p className="font-medium leading-7 break-words whitespace-pre-line px-4 py-2 text-slate-600">
                  {ACCORDION_DATA.content}
               </p>
            </AccordionContent>
         </AccordionItem>
      </Accordion>
   )
}
