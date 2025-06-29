export const SITEMAP = [
   {
      category: '게시판',
      links: [
         { name: '전체 게시판', href: '/board' },
         { name: '자유게시판', href: '/board/free' },
         { name: '철학', href: '/board/philosophy' },
         { name: '기술', href: '/board/technology' },
         { name: '과학', href: '/board/science' },
         { name: '수학', href: '/board/mathematics' },
      ],
   },
   {
      category: '퀴즈',
      links: [
         { name: '퀴즈 메인', href: '/quiz' },
         { name: '프로그래밍 퀴즈', href: '/quiz/programming' },
         { name: '과학 퀴즈', href: '/quiz/science' },
         { name: '철학 퀴즈', href: '/quiz/philosophy' },
         { name: '퀴즈 만들기', href: '/quiz/create' },
      ],
   },
   {
      category: '유틸리티',
      links: [
         { name: '유틸리티 메인', href: '/utils' },
         { name: '이미지 변환기', href: '/utils/image-converter' },
      ],
   },
   {
      category: '계정/사용자',
      links: [
         { name: '로그인', href: '/login' },
         { name: '회원가입', href: '/sign' },
         { name: '비밀번호 찾기', href: '/forget/password' },
         { name: '비밀번호 재설정', href: '/reset/password' },
         { name: '마이페이지', href: '/my-page' },
      ],
   },
   {
      category: '정보/고객지원',
      links: [
         { name: '소개', href: '/introduce' },
         { name: '도움말', href: '/help' },
         { name: '문의하기', href: '/inquiry' },
         { name: '이용약관', href: '/sign/term' },
      ],
   },
]
