# 0rigin Community Web Page v1.0

철학 기반 커뮤니티 게시판

## 개발 인원

[@gitjoyoung](https://github.com/gitjoyoung) - 1인 개발

## 배포 주소

[https://0rigin.space](https://0rigin.space)

## 프로젝트 소개

0rigin project는 AI가 대체할 수 없는 인간의 고유한 가치를 토론하는 커뮤니티 입니다.

## 기술 스택

### Frontend

- Next.js 14
- React 18
- TailwindCSS
- TypeScript

### Backend

- Next.js API Routes
- Supabase (Database & Authentication)

### Deployment

- Vercel

### 주요 라이브러리

- react-markdown
- @supabase/supabase-js

## 프로젝트 구성

- 환경: Next.js
- 디자인 패턴: FSD(Feature Sliced Design)
   - `app/`: 라우팅과 SSR을 위한 Next.js 전용 공간으로 한정
   - `entities/`: 도메인 모델 단위로 상태, 통신, 타입을 응집
   - `features/`: 사용자 행동 중심 기능을 독립적으로 구현
   - `widgets/`: 여러 features/entities를 조합한 화면 구성 단위
   - `shared/`: 모든 영역에서 재사용 가능한 UI, 훅, 유틸, 상수 등
- 핵심 라이브러리: react-markdown
- CSS: TailwindCSS
- 데이터베이스: Supabase

## 주요 기능

### 홈 페이지

- 메인 화면 및 소개

### 게시판

- 페이지네이션 처리
- 마크다운 에디터를 사용한 글쓰기
- 게시글 조회 및 작성

### 사용자 인증

- Supabase Auth를 이용한 로그인
- 회원가입 기능

### 퀴즈

- 퀴즈 풀이 기능
- 진행률 표시
- 정답 확인 기능

## 시작 가이드

### 시스템 요구사항

- Node.js: 20.8.1
- React: 18.3.1
- Next.js: 14.2.4

### 필수 API 키

- Supabase Project URL: Supabase 프로젝트 URL
- Supabase Anon Key: Supabase 프로젝트의 익명 키
- NextAuth Secret Key: NextAuth.js 인증을 위한 비밀 키
- OpenAI API Key: OpenAI 서비스 사용을 위한 API 키

### 환경 변수 설정

프로젝트 루트 디렉토리에 `.env.local` 파일을 생성하고 다음 변수들을 설정해야 합니다:

#### Supabase 환경 변수

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

#### OpenAI 설정

```env
OPENAI_API_KEY=
```

### 설치 및 실행

```bash
$ git clone https://github.com/gitjoyoung/0rigin-next-project.git
$ pnpm install
$ pnpm run dev
```
