import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from '@/shared/shadcn/ui/accordion'
import { Icons } from '@/shared/ui/icons'

const ACCORDION_DATA = {
   title: 'MarkDown 문법',
   content: `# : 제목을 추가하려면 "#"을 사용하세요. \n ex : \`# 제목 1\`, \`## 제목 2\`
** : 굵은 글씨로 표시하려면 "**" 또는 "__"을 사용하세요. \n ex : \`**굵은 글씨**\`
* : 이탤릭체로 표시하려면 "*" 또는 "_"을 사용하세요. \n ex : \`*이탤릭체*\`
- : 목록을 만들려면 "-" 또는 "*"을 사용하세요. \n ex : \`- 목록 항목 1\`
\` : 코드를 표시하려면 "\`"을 사용하세요. 한 줄 코드 \n ex : \`\` \`코드\` \`\`, 여러 줄 코드는 "~~~"을 사용하세요.
> : 인용문을 추가하려면 ">"을 사용하세요. \n ex : \`> 인용문\``,
}

export default function BoardAccordion() {
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
