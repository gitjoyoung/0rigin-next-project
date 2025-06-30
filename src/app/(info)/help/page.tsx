import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from '@/shared/shadcn/ui/accordion'
import { Button } from '@/shared/shadcn/ui/button'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
   title: '도움말',
   description:
      '0RIGIN(제로리진) 일반/구글 회원가입, 커뮤니티 이용 방법, 제재 규칙, 개인정보 보호 정책에 대한 자세한 도움말과 FAQ를 제공합니다.',
}

const FAQ_DATA = [
   {
      category: '계정 및 인증',
      items: [
         {
            question: '회원가입은 어떻게 하나요?',
            answer:
               '0RIGIN(제로리진)은 두 가지 회원가입 방법을 제공합니다:\n\n1. **일반 회원가입**: 이메일과 비밀번호로 직접 가입\n2. **구글 소셜가입**: Google 계정으로 간편하게 가입\n\n상단의 "로그인" 버튼을 클릭하여 원하는 방법을 선택하세요. 구글 소셜가입의 경우 Google 계정으로 로그인하면 자동으로 회원가입이 완료됩니다.',
         },
         {
            question: '비밀번호를 잊어버렸어요',
            answer:
               '가입 방법에 따라 다르게 처리됩니다:\n\n• **일반 회원가입**: 로그인 페이지의 "비밀번호 찾기" 링크를 클릭하여 가입 시 등록한 이메일로 비밀번호 재설정 링크를 받으세요.\n\n• **구글 소셜가입**: Google 계정의 비밀번호 재설정을 이용해주세요. 0RIGIN(제로리진)은 Google OAuth를 통해 인증을 처리합니다.',
         },
         {
            question: '일반 회원가입과 구글 소셜가입의 차이점은 무엇인가요?',
            answer:
               '두 가입 방법의 주요 차이점은 다음과 같습니다:\n\n**일반 회원가입**\n• 이메일과 비밀번호를 직접 설정\n• 비밀번호 관리 필요\n• 0RIGIN(제로리진) 계정으로 독립적 관리\n\n**구글 소셜가입**\n• Google 계정 정보로 간편 로그인\n• 별도 비밀번호 설정 불필요\n• Google 계정 보안 수준 적용\n\n두 방법 모두 동일한 서비스 기능을 이용할 수 있습니다.',
         },
         {
            question: '회원 탈퇴는 어떻게 하나요?',
            answer:
               '마이페이지 > 설정에서 회원 탈퇴를 진행할 수 있습니다.\n\n탈퇴 시 유의사항:\n• 작성한 게시글과 댓글은 자동으로 삭제되지 않습니다\n• 개인정보는 즉시 삭제됩니다 (법령 보존 의무 제외)\n• 탈퇴 후 동일한 이메일로 재가입이 가능합니다\n• 탈퇴는 즉시 처리되며 복구가 불가능합니다',
         },
         {
            question: '비회원도 서비스를 이용할 수 있나요?',
            answer:
               '비회원도 일부 기능을 이용할 수 있습니다:\n\n**비회원 이용 가능**\n• 게시글 및 댓글 조회\n• 퀴즈 조회 및 풀기\n• 검색 기능\n• 유틸리티 (이미지 변환기 등)\n\n**회원 전용 기능**\n• 게시글 및 댓글 작성\n• 게시글 좋아요\n• 퀴즈 제작\n• 마이페이지 이용\n\n더 많은 기능을 이용하시려면 회원가입을 해주세요.',
         },
      ],
   },
   {
      category: '커뮤니티 규칙 및 제재',
      items: [
         {
            question: '어떤 행위가 제재 대상인가요?',
            answer:
               '다음 행위들은 약관 위반으로 제재를 받을 수 있습니다:\n\n• 혐오 발언, 차별적 표현, 괴롭힘 또는 위협\n• 스팸, 무분별한 홍보, 상업적 광고\n• 타인의 개인정보 무단 수집 또는 공개\n• 불법적이거나 음란한 콘텐츠 게시\n• 저작권 침해 콘텐츠 업로드\n• 서비스 운영을 방해하는 행위',
         },
         {
            question: '제재는 어떤 수준으로 이루어지나요?',
            answer:
               '위반 정도에 따라 다음과 같은 제재가 적용됩니다:\n\n1. 경고 및 해당 콘텐츠 삭제\n2. 일시적 서비스 이용 제한 (1일~30일)\n3. 영구적 계정 정지\n4. 심각한 경우 법적 조치\n\n제재는 위반 내용과 빈도를 고려하여 단계적으로 적용됩니다.',
         },
         {
            question: '부당한 제재를 받았다고 생각하는데 어떻게 하나요?',
            answer:
               '부당한 제재라고 판단되시면 문의하기를 통해 이의제기를 할 수 있습니다. 0RIGIN(제로리진)은 합리적인 기간(보통 3-7일) 내에 검토 후 답변드립니다. 이의제기 시 구체적인 상황과 근거를 함께 제시해 주세요.',
         },
         {
            question: '다른 사용자의 부적절한 행위를 신고하고 싶어요',
            answer:
               '부적절한 콘텐츠나 행위를 발견하시면 해당 게시글이나 댓글의 신고 기능을 이용하거나, 문의하기를 통해 신고해 주세요. 신고 내용은 검토 후 적절한 조치를 취합니다.',
         },
      ],
   },
   {
      category: '개인정보 및 프라이버시',
      items: [
         {
            question: '어떤 개인정보를 수집하나요?',
            answer:
               '0RIGIN(제로리진)은 서비스 제공을 위해 다음 정보를 수집합니다:\n\n**공통 수집 정보**\n• 이메일 주소 (필수)\n• 닉네임 (필수)\n• 프로필 정보 (선택)\n\n**일반 회원가입 추가 정보**\n• 암호화된 비밀번호\n\n**구글 소셜가입**\n• Google 계정 기본 정보 (이름, 프로필 사진 등)\n\n수집된 정보는 서비스 제공, 회원 관리, 커뮤니티 운영 목적으로만 사용됩니다.',
         },
         {
            question: '개인정보는 언제까지 보관되나요?',
            answer:
               '개인정보는 회원 탈퇴 시까지 보관됩니다. 단, 관련 법령에 따른 보존 의무가 있는 경우 해당 기간 동안 보관됩니다. 회원은 언제든지 개인정보 열람, 수정, 삭제를 요청할 수 있습니다.',
         },
         {
            question: '내가 작성한 콘텐츠의 저작권은 누구에게 있나요?',
            answer:
               '회원이 서비스에 업로드한 콘텐츠의 저작권은 해당 회원에게 있습니다. 다만, 서비스 운영 및 개선을 위한 제한적 사용권을 0RIGIN(제로리진)에 부여하게 됩니다. 타인의 저작권을 침해하는 콘텐츠는 즉시 삭제됩니다.',
         },
      ],
   },
   {
      category: '서비스 이용',
      items: [
         {
            question: '약관이 변경되면 어떻게 알 수 있나요?',
            answer:
               '약관 변경 시 최소 7일 전에 공지하며, 중요한 변경사항은 30일 전에 미리 공지합니다. 공지는 서비스 내 공지사항과 이메일을 통해 안내됩니다. 변경된 약관에 동의하지 않으시면 서비스 이용을 중단하고 탈퇴하실 수 있습니다.',
         },
         {
            question: '서비스 장애나 중단 시 책임은 누구에게 있나요?',
            answer:
               '천재지변, 시스템 장애 등 불가항력적 사유로 인한 서비스 중단에 대해 0RIGIN(제로리진)은 책임을 지지 않습니다. 회원 간의 분쟁이나 회원이 게시한 콘텐츠로 인한 문제는 해당 회원이 책임을 집니다.',
         },
      ],
   },
   {
      category: '게시판 이용',
      items: [
         {
            question: '게시글은 어떻게 작성하나요?',
            answer:
               '게시글 작성은 로그인 후 이용 가능합니다. 각 게시판에서 "글쓰기" 버튼을 클릭하여 게시글을 작성할 수 있습니다. 제목, 내용을 입력하고 카테고리를 선택한 후 등록하세요.\n\n일반 회원가입 또는 구글 소셜가입으로 가입한 모든 회원이 이용할 수 있습니다.',
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
               '댓글 작성은 로그인 후 이용 가능합니다. 게시글 하단의 댓글 영역에서 댓글을 작성할 수 있습니다. 댓글도 마크다운을 지원하며, 다른 사용자의 댓글에 답글을 달 수도 있습니다.',
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
         {
            question: '퀴즈를 직접 만들 수 있나요?',
            answer:
               '네, 로그인 후 퀴즈 메뉴에서 "퀴즈 제작" 버튼을 클릭하여 나만의 퀴즈를 만들 수 있습니다. 다양한 카테고리의 객관식 문제를 작성하여 다른 회원들과 공유해 보세요.',
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
         {
            question: '이미지 변환 시 개인정보는 안전한가요?',
            answer:
               '업로드된 이미지는 변환 후 즉시 서버에서 삭제되며, 0RIGIN(제로리진)에서 별도로 저장하지 않습니다. 모든 변환 과정은 안전하게 처리됩니다.',
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
               0RIGIN(제로리진) 커뮤니티 이용에 대한 도움이 필요하신가요?
               여기에서 서비스 이용 방법, 커뮤니티 규칙, 개인정보 보호 정책 등에
               대한 답을 찾으실 수 있습니다.
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
                           <AccordionContent className="text-muted-foreground whitespace-pre-line">
                              {item.answer}
                           </AccordionContent>
                        </AccordionItem>
                     ))}
                  </Accordion>
               </div>
            ))}
         </div>

         {/* 문의하기 버튼 */}
         <div className="flex flex-col items-center space-y-4">
            <div className="text-center space-y-2">
               <h3 className="text-lg font-semibold">
                  더 궁금한 점이 있으신가요?
               </h3>
               <p className="text-sm text-muted-foreground">
                  위 FAQ에서 답을 찾지 못하셨다면 언제든지 문의해 주세요.
               </p>
            </div>
            <Link href="/inquiry">
               <Button variant="default" size="lg">
                  문의하기
               </Button>
            </Link>
         </div>
      </div>
   )
}
