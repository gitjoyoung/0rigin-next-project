# ADR: API 엔드포인트 관리 (Supabase 환경)

## 상태

**승인됨 (Accepted)**

## 핵심 질문

**"Supabase를 사용하는데 baseUrl이나 엔드포인트 레지스트리가 필요한가?"**

## 답: 아니요! ❌

---

## 컨텍스트

### Supabase의 특성

```typescript
// Supabase는 클라이언트가 URL을 자체 관리
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL, // 환경변수
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// 테이블 이름만 필요 (URL 불필요!)
const { data } = await supabase.from("posts").select("*");
```

### 전통적 REST API와의 차이

```typescript
// ❌ REST API (baseUrl 필요)
const baseUrl = "https://api.example.com";
fetch(`${baseUrl}/v1/posts`);

// ✅ Supabase (baseUrl 불필요)
supabase.from("posts").select("*");
```

---

## 결정

### ✅ 채택: TABLE_NAMES만 사용

```typescript
// src/shared/constants/table-names.ts
export const TABLE_NAMES = {
  POSTS: "posts",
  CATEGORIES: "categories",
  COMMENTS: "comments",
  // ...
} as const;
```

**이유**:

- Supabase 클라이언트가 URL 자체 관리
- 테이블 이름만 있으면 충분
- 타입 안전성 + 오타 방지

---

### ❌ 불필요: api-endpoints.ts

```typescript
// ❌ Supabase에는 불필요
export const apiV1 = {
  posts: {
    list: () => "/v1/posts",
    create: () => "/v1/posts",
  },
};
```

**이유**:

- Supabase는 URL 경로 개념이 없음
- 테이블 이름으로 직접 접근
- 불필요한 추상화 레이어

---

## 통신 방식별 정리

### 1️⃣ Supabase 서버 통신

```typescript
// src/entities/post/api/post.api.ts
import { SupabaseServerClient } from "@/shared/lib/supabase/supabase-server-client";
import { TABLE_NAMES } from "@/shared/constants/table-names";

export async function getPostList() {
  const supabase = await SupabaseServerClient();

  const { data } = await supabase
    .from(TABLE_NAMES.POSTS) // ← 테이블 이름만
    .select("*");

  return data;
}
```

**필요한 것**:

- ✅ `TABLE_NAMES` 상수
- ✅ `SupabaseServerClient`
- ❌ baseUrl (불필요)
- ❌ endpoint 레지스트리 (불필요)

---

### 2️⃣ Supabase 클라이언트 통신

```typescript
// features/post/model/post.query.ts
import { supabaseBrowserClient } from "@/shared/lib/supabase/supabase-browser-client";
import { TABLE_NAMES } from "@/shared/constants/table-names";

export function usePostList() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const supabase = supabaseBrowserClient();

      const { data } = await supabase
        .from(TABLE_NAMES.POSTS) // ← 테이블 이름만
        .select("*");

      return data;
    },
  });
}
```

**필요한 것**:

- ✅ `TABLE_NAMES` 상수
- ✅ `supabaseBrowserClient`
- ❌ baseUrl (불필요)
- ❌ endpoint 레지스트리 (불필요)

---

### 3️⃣ 외부 API (예: Gemini, 결제 등)

```typescript
// app/api/ai/route.ts (Route Handler)
export async function POST(req: NextRequest) {
  // 외부 API - 여기만 URL 필요
  const result = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
      },
      body: JSON.stringify(data),
    }
  );

  return NextResponse.json(result);
}
```

**필요한 것**:

- ✅ 외부 API URL (하드코딩 OK, 자주 변경 안됨)
- ✅ API 키 (환경변수)
- ❌ 엔드포인트 레지스트리 (간단한 API는 불필요)

---

## 설계 원칙

### **"필요한 곳에만 필요한 만큼"**

| 통신 방식                | baseUrl 필요? | 엔드포인트 레지스트리 필요? | 사용할 것     |
| ------------------------ | ------------- | --------------------------- | ------------- |
| **Supabase 서버**        | ❌            | ❌                          | `TABLE_NAMES` |
| **Supabase 클라이언트**  | ❌            | ❌                          | `TABLE_NAMES` |
| **외부 REST API (간단)** | ❌            | ❌                          | 하드코딩      |
| **외부 REST API (복잡)** | 🔄            | 🔄                          | 선택적        |

---

## 예외: 외부 API가 복잡할 때만

만약 외부 REST API가 **10개 이상**이고 **버전 관리**가 필요하다면:

```typescript
// src/shared/constants/external-apis.ts (선택적)
export const EXTERNAL_APIS = {
  gemini: {
    base: "https://generativelanguage.googleapis.com",
    generateContent: (model: string) =>
      `/v1beta/models/${model}:generateContent`,
  },
  stripe: {
    base: "https://api.stripe.com",
    createPayment: () => "/v1/payment_intents",
  },
} as const;
```

**현재 프로젝트**: Gemini만 사용 → 불필요 ❌

---

## 비교표

### ❌ 불필요한 추상화 (전통적 REST API 방식)

```typescript
// ❌ 과도함
const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  endpoints: {
    posts: {
      list: "/v1/posts",
      create: "/v1/posts",
      detail: (id: number) => `/v1/posts/${id}`,
    },
  },
};

// ❌ 사용
const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.posts.list}`;
fetch(url);
```

### ✅ Supabase 방식 (간결)

```typescript
// ✅ 최소한
const TABLE_NAMES = {
  POSTS: "posts",
};

// ✅ 사용
supabase.from(TABLE_NAMES.POSTS).select("*");
```

---

## 결론

### **Supabase 환경에서 필요한 상수**

```
src/shared/constants/
  ✅ table-names.ts        # Supabase 테이블 (필수)
  ❌ api-endpoints.ts      # 불필요 (삭제)
  ❌ api-config.ts         # 불필요 (삭제)
```

### **핵심 이유**

1. **Supabase는 자체 URL 관리**
   - 클라이언트 초기화 시 URL 설정
   - 테이블 이름만으로 접근 가능

2. **불필요한 추상화 제거**
   - baseUrl 개념 없음
   - 경로 빌더 불필요
   - 버전 관리 불필요

3. **외부 API는 별도 처리**
   - Route Handler에서 직접 호출
   - 간단하면 하드코딩
   - 복잡하면 그때 가서 추상화

---

## 마이그레이션 체크리스트

- [x] `table-names.ts` 생성 및 사용
- [x] `api-endpoints.ts` 삭제 (불필요)
- [x] Supabase 쿼리에 `TABLE_NAMES` 적용
- [x] 외부 API는 Route Handler에서 처리
- [x] 문서화 완료

---

## 참고: REST API vs Supabase

| 특성          | REST API              | Supabase                  |
| ------------- | --------------------- | ------------------------- |
| **URL 구조**  | `GET /api/v1/posts`   | `.from('posts').select()` |
| **경로 관리** | 엔드포인트 레지스트리 | 테이블 이름               |
| **버전 관리** | `/v1/`, `/v2/`        | 스키마 마이그레이션       |
| **baseUrl**   | 필요                  | 불필요 (클라이언트 내장)  |

**시니어의 판단**: "도구의 패러다임을 따르라. Supabase는 REST API가 아니다."
