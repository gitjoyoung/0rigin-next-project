# ADR: 테이블 이름 상수 관리 방식

## 상태

**승인됨 (Accepted)**

## 컨텍스트

entities 폴더에서 Supabase 테이블 이름이 50회 이상 하드코딩되어 있어 다음 문제가 발생:

- 타이핑 오류 가능성
- 테이블 이름 변경 시 모든 파일 수정 필요
- 일관성 보장 어려움

## 결정

**계층별 상수 관리 (Layered Constants Management)** 채택

```
shared/constants/table-names.ts  ← 모든 테이블 이름 중앙 관리
```

### FSD 아키텍처 관점

#### ✅ 이 방식이 FSD를 위반하지 않는 이유:

1. **Shared 레이어의 역할**
   - FSD에서 `shared`는 "여러 레이어에서 공통으로 사용하는 기술적 세부사항"을 담당
   - DB 테이블 이름은 기술적 인프라스트럭처 세부사항
   - 도메인 로직이 아닌 기술적 상수

2. **관심사 분리 유지**
   - Entity: 비즈니스 로직에 집중
   - Shared: 기술적 상수만 제공
   - 의존성 방향: Entity → Shared (FSD 규칙 준수)

3. **응집도 vs 결합도**
   - 테이블 이름은 낮은 응집도 (여러 entity에서 사용)
   - 중앙 관리로 결합도는 높아지지만, 타입 안전성과 유지보수성이 크게 향상

## 대안들

### 대안 1: 각 entity에서 개별 관리 (현재)

```typescript
// entities/post/api/index.ts
.from('posts')

// entities/category/api/index.ts
.from('categories')
```

**장점**:

- 독립성 높음
- 결합도 낮음

**단점**:

- 50회 이상 반복
- 타이핑 오류 위험
- 변경 어려움

### 대안 2: 각 entity에 상수 파일 (Not Recommended)

```typescript
// entities/post/constants.ts
export const POST_TABLE = "posts";

// entities/category/constants.ts
export const CATEGORY_TABLE = "categories";
```

**장점**:

- Entity별 독립성 유지

**단점**:

- 여전히 관리 포인트 분산
- 전체 테이블 목록 파악 어려움
- 일관성 보장 어려움

### 대안 3: 중앙 집중 관리 (채택) ✅

```typescript
// shared/constants/table-names.ts
export const TABLE_NAMES = {
  POSTS: "posts",
  CATEGORIES: "categories",
  // ...
} as const;
```

**장점**:

- 단일 진실 공급원 (Single Source of Truth)
- 타입 안전성
- 변경 용이
- 전체 구조 파악 쉬움

**단점**:

- Entity가 Shared에 의존 (FSD에서 허용되는 의존성)

## 결과

### 개선 효과

- ✅ 타이핑 오류 방지 (타입 체크)
- ✅ 테이블 이름 변경 시 한 곳만 수정
- ✅ 자동 완성으로 개발 생산성 향상
- ✅ 전체 테이블 구조 한눈에 파악

### 마이그레이션 계획

1. `shared/constants/table-names.ts` 생성
2. 각 entity의 API 함수에서 하드코딩된 테이블 이름을 상수로 교체
3. 점진적 적용 (한 entity씩)

## 참고 사항

### 시니어의 판단 기준

```
"상수가 2곳 이상에서 반복되면 추출을 고려한다"
"기술적 세부사항(테이블 이름)과 도메인 로직을 분리한다"
"변경의 영향 범위를 최소화한다"
```

### FSD에서 shared의 역할

- UI 컴포넌트 (Button, Input)
- 유틸리티 함수
- **기술적 상수 (API 엔드포인트, 테이블 이름)** ← 여기!
- 타입 정의
- 공통 훅
