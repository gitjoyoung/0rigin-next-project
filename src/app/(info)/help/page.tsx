import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from '@/shared/shadcn/ui/accordion'
import { Button } from '@/shared/shadcn/ui/button'
import Link from 'next/link'

const FAQ_DATA = [
   {
      category: '계정 및 인증',
      items: [
         {
            question: '회원가입은 어떻게 하나요?',
            answer:
               'Google 계정으로 간편하게 가입할 수 있습니다. 상단의 "로그인" 버튼을 클릭하고 Google 계정으로 로그인하면 자동으로 회원가입이 완료됩니다.',
         },
         {
            question: '비밀번호를 잊어버렸어요',
            answer:
               'Google 계정으로 로그인하시는 경우, Google 계정의 비밀번호 재설정을 이용해주세요. 0RIGIN은 Google OAuth를 통해 인증을 처리합니다.',
         },
      ],
   },
   {
      category: '게시판 이용',
      items: [
         {
            question: '게시글은 어떻게 작성하나요?',
            answer:
               '각 게시판에서 "글쓰기" 버튼을 클릭하여 게시글을 작성할 수 있습니다. 제목, 내용을 입력하고 카테고리를 선택한 후 등록하세요.',
         },
         {
            question: '마크다운을 지원하나요?',
            answer:
               '네, 게시글 작성 시 마크다운 문법을 사용할 수 있습니다. 코드 블록, 링크, 이미지 삽입 등 다양한 마크다운 기능을 지원합니다.',
         },
         {
            question: '게시글을 수정/삭제할 수 있나요?',
            answer:
               '본인이 작성한 게시글만 수정/삭제가 가능합니다. 게시글 상세 페이지에서 수정/삭제 버튼을 확인할 수 있습니다.',
         },
         {
            question: '댓글은 어떻게 작성하나요?',
            answer:
               '게시글 하단의 댓글 영역에서 댓글을 작성할 수 있습니다. 댓글도 마크다운을 지원하며, 다른 사용자의 댓글에 답글을 달 수도 있습니다.',
         },
      ],
   },
   {
      category: '퀴즈 이용',
      items: [
         {
            question: '퀴즈는 어떻게 풀나요?',
            answer:
               '퀴즈 메뉴에서 원하는 카테고리를 선택하고 퀴즈를 시작하세요. 객관식 문제를 풀고 즉시 정답을 확인할 수 있습니다.',
         },
      ],
   },
   {
      category: '유틸리티',
      items: [
         {
            question: '이미지 변환기는 어떻게 사용하나요?',
            answer:
               '유틸리티 > 이미지 변환기에서 이미지를 업로드하고 원하는 형식(JPG, PNG, WebP)으로 변환할 수 있습니다. 최대 10MB까지 지원됩니다.',
         },
      ],
   },
]

export default function HelpPage() {
   return (
      <div className="container mx-auto py-8 space-y-8 max-w-4xl">
         {/* 헤더 */}
         <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">도움말</h1>
            <p className="text-sm text-muted-foreground break-keep">
               0RIGIN 커뮤니티 이용에 대한 도움이 필요하신가요? 여기에서 답을
               찾고 문제를 해결하거나 지원을 받으실 수 있습니다.
            </p>
         </div>

         {/* FAQ 아코디언 */}
         <div className="space-y-8">
            {FAQ_DATA.map((category, categoryIndex) => (
               <div key={categoryIndex} className="space-y-4">
                  <h2 className="text-2xl font-bold border-b pb-2">
                     {category.category}
                  </h2>
                  <Accordion type="single" collapsible className="w-full">
                     {category.items.map((item, index) => (
                        <AccordionItem
                           key={index}
                           value={`${categoryIndex}-${index}`}
                        >
                           <AccordionTrigger className="text-left">
                              {item.question}
                           </AccordionTrigger>
                           <AccordionContent className="text-muted-foreground">
                              {item.answer}
                           </AccordionContent>
                        </AccordionItem>
                     ))}
                  </Accordion>
               </div>
            ))}
         </div>

         {/* 문의하기 버튼 */}
         <div className="flex justify-center">
            <Link href="/inquiry">
               <Button variant="default" size="lg">
                  문의하기
               </Button>
            </Link>
         </div>
      </div>
   )
}
