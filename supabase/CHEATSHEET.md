# 🚀 Supabase CLI 치트시트

## ⚡ **빠른 시작**

```bash
# 1. 프로젝트 연결
pnpm supabase link --project-ref wqgbhahmhmeuzjvrszjj

# 2. 로컬 환경 시작
pnpm supabase start

# 3. 마이그레이션 실행
pnpm supabase db push

# 4. 타입 생성
pnpm run db:types
```

## 📊 **데이터베이스 명령어**

| 명령어     | 설명               | 예시                                |
| ---------- | ------------------ | ----------------------------------- |
| `db push`  | 마이그레이션 실행  | `pnpm supabase db push`             |
| `db reset` | 로컬 DB 리셋       | `pnpm supabase db reset`            |
| `db seed`  | 시드 데이터 로드   | `pnpm supabase db seed`             |
| `db diff`  | 스키마 차이점 확인 | `pnpm supabase db diff --use-migra` |
| `db dump`  | 스키마 덤프        | `pnpm supabase db dump --linked`    |

## 🔧 **마이그레이션 명령어**

| 명령어             | 설명                 | 예시                                         |
| ------------------ | -------------------- | -------------------------------------------- |
| `migration new`    | 새 마이그레이션 생성 | `pnpm supabase migration new add_user_table` |
| `migration list`   | 마이그레이션 목록    | `pnpm supabase migration list`               |
| `migration up`     | 마이그레이션 적용    | `pnpm supabase migration up`                 |
| `migration repair` | 마이그레이션 복구    | `pnpm supabase migration repair`             |

## 🎯 **타입 생성**

```bash
# TypeScript 타입 생성
pnpm supabase gen types typescript \
  --project-id wqgbhahmhmeuzjvrszjj \
  --schema public \
  > src/shared/types/database.types.ts

# 또는 package.json 스크립트 사용
pnpm run db:types
```

## 🔍 **스키마 덤프 옵션**

```bash
# 전체 스키마 (구조 + 데이터)
pnpm supabase db dump --linked --schema public

# 구조만
pnpm supabase db dump --linked --schema public --data-only=false

# 데이터만
pnpm supabase db dump --linked --schema public --data-only=true

# 특정 테이블만
pnpm supabase db dump --linked --schema public --include=posts,comments

# 파일로 저장
pnpm supabase db dump --linked --schema public > backup.sql
```

## 🚀 **로컬 환경 관리**

| 명령어   | 설명               | 포트                                 |
| -------- | ------------------ | ------------------------------------ |
| `start`  | 로컬 Supabase 시작 | API: 54321, DB: 54322, Studio: 54323 |
| `stop`   | 로컬 Supabase 중지 | -                                    |
| `status` | 서비스 상태 확인   | -                                    |

```bash
# 로컬 환경 시작
pnpm supabase start

# 상태 확인
pnpm supabase status

# 중지
pnpm supabase stop

# 완전 정리 (볼륨 포함)
pnpm supabase stop --no-backup
```

## 🔐 **인증 명령어**

```bash
# 로그인
pnpm supabase login

# 프로젝트 목록
pnpm supabase projects list

# 프로젝트 연결
pnpm supabase link --project-ref YOUR_PROJECT_REF

# 로그아웃
pnpm supabase logout
```

## 📁 **프로젝트 구조**

```
supabase/
├── config.toml                                   # Supabase 설정
├── seed.sql                                      # 시드 데이터
├── migrations/                                   # 마이그레이션 파일들
│   ├── 20250705145300_initial_schema.sql
│   └── 20250705150000_fix_production_schema.sql
└── functions/                                    # Edge Functions (필요시)
```

## 🎨 **데이터베이스 함수 호출**

```sql
-- 조회수 증가
SELECT increment_view_count(1);

-- 방문자 수 증가
SELECT increment_visitor_count('session_123');

-- 통계 업데이트
SELECT update_stats();
```

## 🔧 **환경변수 (.env.local)**

```bash
# Supabase 연결 정보
SUPABASE_PROJECT_REF=wqgbhahmhmeuzjvrszjj
SUPABASE_ACCESS_TOKEN=sbp_xxxxxxxxxxxxxxxxxx
SUPABASE_URL=https://wqgbhahmhmeuzjvrszjj.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIs...

# Next.js 환경변수
NEXT_PUBLIC_SUPABASE_URL=https://wqgbhahmhmeuzjvrszjj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
```

## 🚨 **자주 발생하는 오류**

### ❌ "Cannot find project ref"

```bash
# 해결: 프로젝트 연결
pnpm supabase link --project-ref YOUR_PROJECT_REF
```

### ❌ "Invalid access token format"

```bash
# 해결: .env.local에 올바른 액세스 토큰 설정
SUPABASE_ACCESS_TOKEN=sbp_xxxxxxxxxxxxxxxxxx
```

### ❌ "Connection refused"

```bash
# 해결: 로컬 Supabase 시작
pnpm supabase start
```

### ❌ "Migration already exists"

```bash
# 해결: 기존 마이그레이션 확인 후 새 이름 사용
pnpm supabase migration list
pnpm supabase migration new different_name
```

## 📊 **테이블 요약**

| 테이블           | 용도            | 주요 컬럼                                      |
| ---------------- | --------------- | ---------------------------------------------- |
| `categories`     | 게시판 카테고리 | `name`, `slug`, `can_write`                    |
| `profile`        | 사용자 프로필   | `email`, `nickname`, `signup_complete`         |
| `posts`          | 게시글          | `title`, `content`, `category_id`, `author_id` |
| `comments`       | 댓글            | `content`, `post_id`, `parent_id`, `depth`     |
| `post_likes`     | 게시글 좋아요   | `post_id`, `user_id`, `anon_key`               |
| `points`         | 포인트 시스템   | `user_id`, `points`, `source`                  |
| `quizzes`        | 퀴즈            | `title`, `author_id`, `pass_score`             |
| `quiz_questions` | 퀴즈 문제       | `quiz_id`, `question_text`, `correct_answer`   |
| `quiz_attempts`  | 퀴즈 시도       | `quiz_id`, `user_id`, `score`, `passed`        |
| `quiz_answers`   | 퀴즈 답변       | `attempt_id`, `question_id`, `is_correct`      |
| `daily_stats`    | 일일 통계       | `date`, `user_count`, `post_count`             |
| `visitors`       | 방문자 로그     | `visitor_id`, `page_url`, `browser`            |

## ⚡ **성능 팁**

```sql
-- 인덱스 활용 쿼리
SELECT * FROM posts WHERE category_id = 'uuid' ORDER BY created_at DESC;

-- JSONB 쿼리
SELECT * FROM posts WHERE content->>'title' ILIKE '%검색어%';

-- 조인 최적화
SELECT p.title, c.name
FROM posts p
JOIN categories c ON p.category_id = c.id
WHERE c.slug = 'dev';
```

---

> 💡 **Tip**: 이 파일을 북마크하여 빠른 참조용으로 사용하세요!  
> 📖 자세한 내용은 [README.md](./README.md)를 참조하세요.
