# 0rigin Community TRD (기술 요구사항 명세서)

## 1. 시스템 아키텍처

- **Frontend**: Next.js(15), React(19), TypeScript, TailwindCSS
- **Backend**: Supabase(DB & Auth)
- **Deployment**: Vercel

## 2. 기술 스택 및 주요 라이브러리

- **UI**: React, TailwindCSS, react-markdown
- **DB/인증**: supabase-js, @supabase/ssr
- **AI 연동**: OpenAI API
- **상태관리/유틸**: React Query, zustand
- **폼 관리**: react-hook-form, zod
- **스타일링**: framer-motion, lucide-react
- **마크다운**: @uiw/react-md-editor, remark, rehype

## 3. 데이터베이스 설계

- **주요 테이블**: users, profile, posts, comments, quizzes 등
- **인증**: Supabase Auth(소셜 로그인, JWT 기반)
- **RLS(행 수준 보안)**: 민감 데이터 보호를 위한 정책 적용

## 4. API 및 외부 연동

- **Supabase RESTful API**: 데이터 CRUD, 인증 처리
- **OpenAI API**: AI 서비스(예: 질문 추천 등) 연동

## 5. 보안 및 운영

- **환경 변수**: API 키 등 민감 정보는 .env.local로 관리
- **HTTPS**: Vercel 기본 제공
- **에러 로깅/모니터링**: Vercel/Next.js 내장 기능 활용

## 6. 배포 및 유지보수

- **CI/CD**: Vercel Git 연동 자동 배포
- **버전 관리**: GitHub
- **문서화**: README, PRD, TRD 등 별도 관리

---

## 7. FSD(Feature-Sliced Design) 구조 및 계층별 컨벤션

### 개요

- 본 문서는 프로젝트의 폴더 구조, FSD(Feature-Sliced Design) 원칙, 각 계층별(entities, widgets, shared) 역할 및 네이밍 규칙, 그리고 entities 계층의 import 방식에 대한 컨벤션을 설명합니다.
- 실제 코드에서는 아래 규칙과 예시를 참고하여 구조와 import 방식을 일관성 있게 유지하세요.

### 기본 원칙

- 도메인/기능별로 entities, widgets, shared 등 계층 분리
- 각 계층은 역할에 따라 하위 디렉토리/파일을 세분화
- **barrel export(index.ts) 사용 규칙:**
   - **클라이언트 전용 계층(shared, widgets 등)**에서는 barrel export(index.ts) 사용 가능
   - **entities 계층(특히 서버 컴포넌트/서버 액션)**에서는 barrel export(index.ts) 사용 금지, 반드시 api 파일을 직접 import해야 함
- Next.js App Router 환경에서는 서버/클라이언트 코드가 섞인 barrel export(index.ts) 사용 시, 클라이언트 컴포넌트에서 서버 코드가 import되어 에러가 발생할 수 있습니다.

### widgets

- UI 조립/프레젠테이션 단위(헤더, 푸터, 배너, 티커 등)
- 각 위젯별 디렉토리(예: `header/`, `footer/`, `banner/`)
- 내부에 UI, 상수, 모델 등 하위 디렉토리/파일 존재 가능
- 네이밍: kebab-case(폴더 ,파일), UpperCamelCase(컴포넌트)
- 예시: `src/widgets/header/index.tsx`, `src/widgets/banner/banner-list.tsx`

### shared

- cross-feature 공통 자원(상수, 유틸, 타입, 공통 hooks, store 등)
- 역할별 하위 디렉토리(`ui/`, `constants/`, `utils/`, `types/` 등)
- 네이밍: kebab-case(폴더), camelCase/UpperCamelCase(함수/컴포넌트/타입)
- 예시: `src/shared/ui/mode-toggle.tsx`, `src/shared/constants/validation-rules.ts`
- **barrel export(index.ts) 사용 가능**

### entities

- 도메인/비즈니스 단위(quiz, post, comment, category, profile 등)
- 각 엔티티별 디렉토리, 내부에 `api/` 폴더만 운용
- 네이밍: kebab-case(폴더), UpperCamelCase(타입/컴포넌트)
- 예시: `src/entities/quiz/api/quiz-api.ts`
- **barrel export(index.ts) 사용 금지, 직접 import 필수**

## 8. 디렉토리 구조 예시

```
// ✅ DO: 실제 예시
src/
├── widgets/
│ ├── header/
│ │ ├── index.tsx
│ │ └── ui/
│ ├── banner/
│ │ └──index.tsx
│ └── ...
├── shared/
│ ├── ui/
│ ├── constants/
│ ├── utils/
│ ├── types/
│ └── ...
├── entities/
│ ├── quiz/
│ │ └── api/
│ │     └── quiz-api.ts
│ ├── post/
│ │ └── api/
│ │     └── post-api.ts
│ └── ...

// ❌ DON'T: 역할이 섞인 폴더, 네이밍 불일치, entities에서 barrel export 사용 등
```

---
