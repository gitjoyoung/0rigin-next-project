# 0rigin Community Web Page v1.0

철학 기반 커뮤니티 게시판

## 개발 인원

1인 개발

## 배포 주소

[https://0rigin.vercel.app/](https://0rigin.vercel.app/)

## 프로젝트 소개

0rigin project는 AI가 대체할 수 없는 인간의 고유한 가치를 토론하는 커뮤니티 입니다.

## 프로젝트 구성

- 환경: Next.js
- 디자인 패턴: FSD(Feature Sliced Design)
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
- pnpm: 8.6.2
- React: 18.3.1
- Next.js: 14.2.4

### 필수 API 키

- Supabase Project URL: Supabase 프로젝트 URL
- Supabase Anon Key: Supabase 프로젝트의 익명 키
- NextAuth Secret Key: NextAuth.js 인증을 위한 비밀 키
- OpenAI API Key: OpenAI 서비스 사용을 위한 API 키

### 환경 변수 설정

프로젝트 루트 디렉토리에 `.env.local` 파일을 생성하고 다음 변수들을 설정해야 합니다:

#### Next.js 환경 변수

```env
API_URL=
NEXTAUTH_URL_INTERNAL=
NEXTAUTH_SECRET=
```

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
