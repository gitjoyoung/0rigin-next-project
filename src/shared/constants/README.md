# Shared Constants

공통 상수를 관리하는 디렉토리입니다.

## 📁 파일 구조

```
shared/constants/
├── table-names.ts          # Supabase 테이블 이름 (필수)
└── validation-rules.ts     # 검증 규칙 상수
```

---

## ✅ table-names.ts

**용도**: Supabase 테이블 이름 관리

```typescript
export const TABLE_NAMES = {
  POSTS: "posts",
  CATEGORIES: "categories",
  COMMENTS: "comments",
} as const;
```

**사용 위치**:

- `entities/*/api/*.ts` - 모든 Supabase 쿼리
- 서버/클라이언트 모두 사용

**이점**:

- ✅ 타입 안전성 (자동 완성)
- ✅ 오타 방지
- ✅ 변경 용이 (한 곳만 수정)

---

## ❌ 불필요한 파일들

### api-endpoints.ts (삭제됨)

**이유**: Supabase는 테이블 이름만 사용. URL 경로 개념 없음.

```typescript
// ❌ 불필요 (REST API 패턴)
export const endpoints = {
  posts: {
    list: "/v1/posts",
  },
};

// ✅ Supabase는 테이블 이름만
export const TABLE_NAMES = {
  POSTS: "posts",
};
```

### api-config.ts (불필요)

**이유**: Supabase 클라이언트가 baseUrl 자체 관리.

```typescript
// ❌ 불필요
export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
};

// ✅ Supabase 클라이언트 초기화에 포함
createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
```

---

## 🎯 설계 원칙

### "Supabase는 REST API가 아니다"

| 전통적 REST API     | Supabase                  |
| ------------------- | ------------------------- |
| `GET /api/v1/posts` | `.from('posts').select()` |
| baseUrl + endpoint  | 테이블 이름               |
| 경로 관리 필요      | 테이블 이름만             |

### "필요한 상수만 관리"

- ✅ **반복되는 값**: 테이블 이름 (50회 이상)
- ✅ **변경 가능성**: 테이블 이름 변경 시
- ❌ **단일 사용**: 외부 API URL (1~2회)
- ❌ **이미 관리됨**: Supabase URL (환경변수)

---

## 📝 사용 예시

### Supabase 쿼리 (서버)

```typescript
// entities/post/api/post.api.ts
import { SupabaseServerClient } from "@/shared/lib/supabase/supabase-server-client";
import { TABLE_NAMES } from "@/shared/constants/table-names";

export async function getPostList() {
  const supabase = await SupabaseServerClient();

  return supabase
    .from(TABLE_NAMES.POSTS) // ← 상수 사용
    .select("*");
}
```

### Supabase 쿼리 (클라이언트)

```typescript
// features/post/model/post.query.ts
import { supabaseBrowserClient } from "@/shared/lib/supabase/supabase-browser-client";
import { TABLE_NAMES } from "@/shared/constants/table-names";

export function usePostList() {
  return useQuery({
    queryFn: async () => {
      const supabase = supabaseBrowserClient();
      const { data } = await supabase
        .from(TABLE_NAMES.POSTS) // ← 상수 사용
        .select("*");
      return data;
    },
  });
}
```

### 외부 API (Route Handler)

```typescript
// app/api/ai/route.ts
export async function POST(req: NextRequest) {
  // 외부 API는 직접 URL 사용 (간단하므로 하드코딩 OK)
  const result = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
    {
      /* ... */
    }
  );

  return NextResponse.json(result);
}
```

---

## 🚀 추가 상수 가이드

### 상수 추가 기준

새로운 상수 파일을 추가할 때 자문:

- [ ] 3곳 이상에서 반복되는가?
- [ ] 변경 시 전체 영향이 있는가?
- [ ] 타입 안전성이 필요한가?
- [ ] 다른 레이어에서 공유되는가?

**모두 예** → `shared/constants/`에 추가
**하나라도 아니요** → 사용처에 직접 정의

### 예시

```typescript
// ✅ 상수로 관리
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB (여러 곳 사용)

// ❌ 상수 불필요
const pageTitle = "게시글 목록"; // 한 곳에서만 사용
```

---

## 📚 참고 문서

- [ADR: 테이블 이름 상수 관리](../../docs/architecture-decision-records/table-names-management.md)
- [ADR: API 엔드포인트 관리](../../docs/architecture-decision-records/api-endpoints-supabase.md)
