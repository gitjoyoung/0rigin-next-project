# 0rigin Space

[![PRD](https://img.shields.io/badge/📋_PRD-제품_요구사항-blue?style=for-the-badge)](./PRD.md) [![TRD](https://img.shields.io/badge/⚙️_TRD-기술_요구사항-green?style=for-the-badge)](./TRD.md)

## 프로젝트 개요

**0rigin Space**는 AI 시대에 인간 고유의 가치를 탐구하는 철학·인문학 커뮤니티 플랫폼입니다. 사용자들이 철학적 질문과 토론을 통해 사고를 확장하고, 퀴즈 기반 학습으로 재미있게 지식을 습득할 수 있는 공간을 제공하는 커뮤니티 플랫폼 입니다.

---

## 주요 기능

### 🗣️ 커뮤니티 게시판

- **카테고리**: 철학 질문 / AI 윤리 / 자유 토론
- **기능**: 마크다운 글쓰기, 댓글, 태그, 검색, 좋아요/북마크
- **특징**: 게시물과 연관된 퀴즈 자동 추천

### 🧠 퀴즈 시스템

- **유형**: 객관식, OX 문제
- **기능**: 타이머, 난이도 설정, 정답 해설
- **특징**: 게시글과 연동, 학습 통계 제공

### 👤 사용자 관리

- **인증**: 소셜 로그인 (Google, GitHub)
- **프로필**: 관심사 태그, 활동 이력
- **커뮤니티**: 신고/차단 기능

### 🛠️ 유틸리티 도구

- 이미지 용량 압축 및 확장자 변환
- 웹 기반 편의 기능

---

## 기술 스택

### Frontend

- **Next.js(15)** - React 기반 풀스택 프레임워크
- **React(19)** - UI 라이브러리
- **TypeScript** - 타입 안전성
- **TailwindCSS** - 유틸리티 퍼스트 CSS 프레임워크

### Backend & Database

- **Supabase** - PostgreSQL 기반 DB·Auth·Storage 백엔드
- **Next.js API Routes** - 서버 사이드 로직

### 주요 라이브러리

- **상태관리**: React Query, zustand
- **폼 관리**: react-hook-form, zod
- **마크다운**: @uiw/react-md-editor, react-markdown
- **스타일링**: framer-motion, lucide-react
- **AI 연동**: OpenAI API

### 배포 & 운영

- **Vercel** - 배포 플랫폼
- **GitHub** - 버전 관리

---

## 아키텍처

### FSD(Feature-Sliced Design) 구조

```
src/
├── app/           # Next.js App Router
├── widgets/       # UI 위젯 (헤더, 푸터, 배너 등)
├── shared/        # 공통 자원 (UI, 유틸, 타입 등)
├── entities/      # 도메인 로직 (quiz, post, comment 등)
└── ...
```

### 주요 특징

- **클라이언트/서버 컴포넌트 분리**: Next.js App Router 최적화
- **직접 import 방식**: entities 계층에서 barrel export 금지
- **타입 안전성**: TypeScript + Zod 스키마 검증

---

## 설치 및 실행

### 1. 저장소 클론

```bash
git clone https://github.com/gitjoyoung/0rigin-next-project.git
cd 0rigin-next-project
```

### 2. 의존성 설치

```bash
pnpm install
```

### 3. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 값들을 설정하세요:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# OpenAI (선택사항)
OPENAI_API_KEY=your_openai_api_key

# NextAuth (필요시)
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

### 4. 개발 서버 실행

```bash
pnpm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

---

## 주요 스크립트

```bash
# 개발 서버 실행
pnpm run dev

# 프로덕션 빌드
pnpm run build

# 프로덕션 서버 실행
pnpm run start

# 린트 검사
pnpm run lint

# 타입 체크
pnpm run typecheck

# 테스트 실행
pnpm run test

# 코드 포맷팅
pnpm run format

# 데이터베이스 타입 생성
pnpm run db:types

# 퀴즈 데이터 업로드
pnpm run upload-quiz

# 게시글 데이터 업로드
pnpm run upload-post
```

---

## 개발 가이드

### 코드 컨벤션

- **FSD 구조** 준수
- **entities 계층**: barrel export 금지, 직접 import 사용
- **네이밍**: kebab-case(폴더/파일), UpperCamelCase(컴포넌트)
- **타입 안전성**: TypeScript + Zod 스키마 검증

### 주요 규칙

- 서버 컴포넌트/액션에서는 반드시 api 파일 직접 import
- 클라이언트 전용 계층(shared, widgets)에서는 barrel export 사용 가능
- 마크다운 문법 지원으로 풍부한 콘텐츠 작성

---

## 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

---

## 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 문의

프로젝트에 대한 질문이나 제안사항이 있으시면 언제든 연락해 주세요.

- **GitHub**: [gitjoyoung](https://github.com/gitjoyoung)
- **Website**: [0rigin.space](https://0rigin.space)
