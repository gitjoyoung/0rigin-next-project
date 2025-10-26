# ADR: API 레이어 설계 (Supabase 중심 프로젝트)

## 상태

**승인됨 (Accepted)**

## 컨텍스트

Next.js 15 + FSD + Supabase 조합에서 API 계층을 어떻게 구성할지 결정이 필요했습니다.

### 고려사항

- Supabase가 이미 강력한 타입 생성 제공
- RLS로 권한 제어 가능
- Server/Browser 클라이언트 분리 필요
- 외부 API(Gemini 등)도 일부 사용
- 일관된 에러 처리 필요

## 결정

**하이브리드 접근법: Supabase 네이티브 + 선택적 BFF**

### 핵심 원칙

1. **Supabase 우선**: 대부분의 CRUD는 직접 Supabase 호출
2. **BFF는 선택적**: 외부 API, 복잡한 조합 로직만
3. **에러 표준화**: Supabase 에러를 앱 전역 포맷으로 변환
4. **타입 안전성**: Supabase 타입 + Zod 검증 조합

---

## 채택한 구조

```
src/
  shared/
    constants/
      table-names.ts       # DB 테이블 이름 상수
    api/
      errors.ts            # 에러 표준화
      schema.ts            # Zod 유틸 (선택적)
    lib/
      supabase/
        supabase-query.ts  # 공통 Supabase wrapper

  entities/
    post/
      api/
        post.api.ts        # 직접 Supabase 호출
      model/
        post.query.ts      # React Query 훅

  app/
    api/
      ai/route.ts          # BFF (외부 API용)
```

---

## 비교: 제안 vs 채택

| 레이어          | 제안 (REST API 중심) | 채택 (Supabase 중심)     | 이유                 |
| --------------- | -------------------- | ------------------------ | -------------------- |
| **Fetcher**     | `postJson` (공통)    | Supabase 클라이언트      | Supabase가 이미 제공 |
| **엔드포인트**  | `endpoints.ts`       | `TABLE_NAMES`            | 테이블 이름만 필요   |
| **에러 처리**   | `HttpError`          | `normalizeSupabaseError` | Supabase 특화        |
| **BFF**         | 모든 요청            | 선택적                   | 단순 CRUD는 불필요   |
| **타입 안전성** | Zod 스키마           | Supabase 타입 + Zod      | 하이브리드           |

---

## 구현 예시

### 1. 단순 CRUD (BFF 없음)

```typescript
// entities/post/api/post.api.ts
import { querySupabase } from "@/shared/lib/supabase/supabase-query";
import { TABLE_NAMES } from "@/shared/constants/table-names";

export async function getPostList(category: string) {
  return querySupabase((supabase) =>
    supabase.from(TABLE_NAMES.POSTS).select("*").eq("category", category)
  );
}
```

### 2. 복잡한 로직 (BFF 사용)

```typescript
// app/api/ai/route.ts
export async function POST(req: NextRequest) {
  // Gemini API + 복잡한 비즈니스 로직
  const result = await generateAI(input);
  return NextResponse.json(result);
}
```

### 3. 에러 처리

```typescript
// shared/api/errors.ts
export function normalizeSupabaseError(error: any): AppError {
  const messageMap = {
    "23505": "이미 존재하는 데이터입니다.",
    PGRST116: "데이터를 찾을 수 없습니다.",
  };

  return new AppError(
    messageMap[error.code] ?? error.message,
    error.code,
    /* status */ 500
  );
}
```

---

## 장점

### 1. Supabase 강점 활용

- ✅ 자동 타입 생성 활용
- ✅ RLS 권한 제어
- ✅ Real-time, Subscriptions 지원
- ✅ 내장 에러 핸들링

### 2. 불필요한 추상화 제거

- ✅ BFF 레이어 최소화 (외부 API만)
- ✅ fetch wrapper 불필요 (Supabase 클라이언트 사용)
- ✅ 엔드포인트 레지스트리 간소화 (TABLE_NAMES)

### 3. 유연성 유지

- ✅ 외부 API는 BFF로 처리
- ✅ 에러 표준화로 일관성 확보
- ✅ 필요시 Zod 검증 추가 가능

---

## 단점 및 트레이드오프

### 제한사항

- ❌ Supabase 종속성 높음 (다른 DB로 이전 시 리팩토링)
- ❌ REST API 표준 패턴과 다름

### 완화 방법

- 💡 `querySupabase` wrapper로 추상화 제공
- 💡 필요시 BFF 추가 가능 (점진적 확장)
- 💡 Supabase Edge Functions로 복잡 로직 분리

---

## 의사결정 기준

### BFF 사용 여부

| 상황          | BFF 필요 | 이유                 |
| ------------- | -------- | -------------------- |
| 단순 CRUD     | ❌       | Supabase 직접 호출   |
| 외부 API 호출 | ✅       | API 키 숨김, 복잡도  |
| 복잡한 조합   | ✅       | 비즈니스 로직 캡슐화 |
| 인증/권한     | ❌       | RLS로 처리           |

### 에러 처리 전략

```
1. Supabase 에러 캐치
   ↓
2. normalizeSupabaseError로 변환
   ↓
3. 사용자 친화적 메시지
   ↓
4. 로깅/모니터링
```

---

## 마이그레이션 계획

### Phase 1: 기반 구축 ✅

- [x] `table-names.ts` 생성
- [x] `errors.ts` 생성
- [x] `supabase-query.ts` 생성

### Phase 2: 점진적 적용

- [ ] 1개 entity에 `querySupabase` 적용
- [ ] 에러 처리 검증
- [ ] 나머지 entities로 확장

### Phase 3: 최적화

- [ ] 로깅/모니터링 연동
- [ ] 성능 측정
- [ ] 문서화

---

## 참고 사항

### 시니어의 판단

```
"도구의 강점을 활용하라"
"불필요한 추상화는 복잡성만 증가시킨다"
"필요할 때 점진적으로 확장 가능한 구조를 유지하라"
```

### Supabase vs REST API 패턴

| 측면           | REST API 패턴 | Supabase 패턴 |
| -------------- | ------------- | ------------- |
| **엔드포인트** | URL 경로 관리 | 테이블 이름   |
| **타입**       | Zod 스키마    | 자동 생성     |
| **권한**       | JWT/미들웨어  | RLS           |
| **실시간**     | WebSocket     | 내장          |

---

## 결론

**"Supabase의 강점을 활용하되, 필요한 추상화만 추가한다"**

- 🎯 Supabase 네이티브 패턴 우선
- 🎯 에러/로깅만 표준화
- 🎯 BFF는 정말 필요할 때만
- 🎯 점진적 확장 가능한 구조
