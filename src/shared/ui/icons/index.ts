import {
   ArrowLeft,
   ArrowRight,
   Bell,
   Check,
   ChevronLeft,
   ChevronRight,
   Eye,
   EyeOff,
   FileQuestion,
   Frown,
   Heart,
   Home,
   ImageUp,
   Instagram,
   Lock,
   LogOut,
   Mail,
   MapPin,
   Menu,
   MessageCircle,
   MessageSquare,
   Moon,
   MoreHorizontal,
   Pencil,
   RefreshCcw,
   Search,
   Settings,
   Share,
   Smile,
   Sun,
   Trash,
   Twitter,
   User,
   X,
} from 'lucide-react'

export const Icons = {
   // 표정
   smile: Smile,
   frown: Frown,

   // 일반적인 UI 아이콘
   search: Search,
   home: Home,
   user: User,
   settings: Settings,
   logout: LogOut,
   mapMarkerAlt: MapPin,
   x: X,
   sun: Sun,
   moon: Moon,
   // 메뉴
   burger: Menu,
   bell: Bell,
   arrowLeft: ArrowLeft,
   arrowRight: ArrowRight,

   // 폼 관련 아이콘
   email: Mail,
   password: Lock,
   eyeOpen: Eye,
   eyeClosed: EyeOff,
   fileQuestion: FileQuestion,
   refreshCcw: RefreshCcw,
   edit: Pencil,
   delete: Trash,
   check: Check,

   // 소셜 액션 아이콘
   heart: Heart,
   comment: MessageCircle,
   share: Share,
   more: MoreHorizontal,
   twitter: Twitter,
   instagram: Instagram,

   // 게시글
   messageSquare: MessageSquare,

   // 이미지
   imageUpload: ImageUp,

   // 페이지네이션
   prevPage: ChevronLeft,
   nextPage: ChevronRight,
}

/* 아이콘 사용법
1. 기본 사용:
   <Icons.search />

2. 크기 조절:
   <Icons.search size={24} />
   <Icons.search size="2x" />

3. 색상 변경:
   <Icons.search className="text-blue-500" />
   <Icons.search color="red" />

4. 스트로크 두께:
   <Icons.search strokeWidth={1.5} />

5. 회전:
   <Icons.search className="rotate-90" />

6. 모든 속성 예시:
   <Icons.search 
     size={24}
     color="blue"
     strokeWidth={2}
     className="rotate-90 opacity-50"
   />

7. 애니메이션 예시:
   // 회전 애니메이션
   <Icons.search className="animate-spin" />
   
   // 펄스 효과
   <Icons.heart className="animate-pulse" />
   
   // 바운스 효과
   <Icons.share className="animate-bounce" />
   
   // 페이드 인/아웃
   <Icons.more className="animate-fade" />
   
   // 커스텀 애니메이션 (CSS 클래스 사용)
   <Icons.heart className="hover:scale-125 transition-transform duration-300" />
   
   // 커스텀 키프레임 애니메이션
   <Icons.heart className="animate-custom" />
   
   // CSS 예시:
   // @keyframes custom {
   //   0% { transform: scale(1); }
   //   50% { transform: scale(1.2); }
   //   100% { transform: scale(1); }
   // }
   // .animate-custom {
   //   animation: custom 1s infinite;
   // }
*/
