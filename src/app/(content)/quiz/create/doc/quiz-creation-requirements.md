# 퀴즈 생성 요구사항 문서

## 📋 개요

이 문서는 퀴즈 생성 시스템의 요구사항, 제약사항, 그리고 구현 세부사항을 설명합니다.

## 🔐 인증 및 권한 관리

### 1. 로그인 검증

- **페이지 레벨 검증**: `/quiz/create` 페이지 접근 시 서버에서 로그인 상태 확인
- **API 레벨 검증**: 각 API 엔드포인트에서 사용자 인증 재확인
- **리다이렉트**: 로그인하지 않은 사용자는 `/quiz?error=login_required`로 리다이렉트

## 🎯 필수 입력 항목

### 1. 퀴즈 기본 정보

- **퀴즈 제목** (필수)
   - 빈 문자열이 아니어야 함
   - 최대 길이: 제한 없음
   - 특수문자 허용

### 2. 문제 정보

- **문제 제목** (필수)
   - 모든 문제의 제목이 필수 입력
   - 빈 문자열이 아니어야 함
   - 최대 길이: 제한 없음

## 🔢 선택지 제약사항

### 1. 선택지 개수

- **최소 개수**: 2개
- **최대 개수**: 5개
- **기본값**: 2개 (새 문제 생성 시)

### 2. 선택지 유효성 검사

- 빈 문자열은 유효한 선택지로 간주하지 않음
- 실제 입력된 선택지 개수만 카운트
- 최소 2개 이상의 유효한 선택지가 있어야 함

### 3. 정답 번호 제약사항

- 정답 번호는 1부터 유효한 선택지 개수까지
- 선택지가 삭제될 때 정답 번호 자동 조정
- 삭제되는 선택지가 정답이면 1번으로 자동 변경

## 📝 선택 입력 항목

### 1. 퀴즈 설명

- 선택사항
- 최대 길이: 제한 없음
- 마크다운 형식 지원

### 2. 정답 설명

- 각 문제별 선택사항
- 정답에 대한 상세 설명
- 최대 길이: 제한 없음

### 3. 공개 설정

- 기본값: 공개 (true)
- 비공개 퀴즈도 생성 가능

## 🔍 유효성 검사 규칙

### 1. 클라이언트 검증 (훅 레벨)

```typescript
const validateForm = (): { isValid: boolean; errors: string[] } => {
   const errors: string[] = []

   // 퀴즈 제목 검증
   if (!form.title.trim()) {
      errors.push('퀴즈 제목을 입력해주세요.')
   }

   // 문제 제목 검증
   if (form.questions.some((q) => !q.question_text.trim())) {
      errors.push('모든 문제의 제목을 입력해주세요.')
   }

   // 선택지 개수 검증
   for (let i = 0; i < form.questions.length; i++) {
      const question = form.questions[i]
      const validOptions = [
         question.option_1,
         question.option_2,
         question.option_3,
         question.option_4,
         question.option_5,
      ].filter((option) => option.trim() !== '')

      if (validOptions.length < 2) {
         errors.push(`문제 ${i + 1}: 최소 2개의 선택지를 입력해주세요.`)
      }

      if (validOptions.length > 5) {
         errors.push(`문제 ${i + 1}: 최대 5개의 선택지만 입력할 수 있습니다.`)
      }

      // 정답 번호 검증
      if (
         question.correct_answer < 1 ||
         question.correct_answer > validOptions.length
      ) {
         errors.push(`문제 ${i + 1}: 정답 번호가 유효하지 않습니다.`)
      }
   }

   return { isValid: errors.length === 0, errors }
}
```

### 2. 서버 검증 (API 레벨)

- 클라이언트 검증과 동일한 규칙 적용
- 데이터베이스 제약사항 확인
- 사용자 권한 재확인

## 🎨 사용자 인터페이스

### 1. 실시간 피드백

- 선택지 개수 표시: "2/5" 형태
- 유효성 검사 결과 즉시 표시
- 에러 메시지 상세 안내

### 2. 동적 UI

- 선택지 2개 미만: 삭제 버튼 비활성화
- 선택지 5개: 추가 버튼 비활성화
- 정답 선택 라디오 버튼 동적 생성

### 3. 에러 표시

```typescript
{validOptionCount < 2 && (
   <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
         최소 2개의 선택지를 입력해주세요.
      </AlertDescription>
   </Alert>
)}
```

## 🗄️ 데이터베이스 스키마

### 1. 퀴즈 테이블 (quizzes)

```sql
CREATE TABLE quizzes (
   id SERIAL PRIMARY KEY,
   title VARCHAR NOT NULL,
   description TEXT,
   author_id UUID REFERENCES auth.users(id),
   is_public BOOLEAN DEFAULT true,
   created_at TIMESTAMP DEFAULT NOW(),
   updated_at TIMESTAMP DEFAULT NOW()
);
```

### 2. 퀴즈 문제 테이블 (quiz_questions)

```sql
CREATE TABLE quiz_questions (
   id SERIAL PRIMARY KEY,
   quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
   question_number INTEGER NOT NULL,
   question_text TEXT NOT NULL,
   question_type VARCHAR DEFAULT 'multiple_choice',
   points INTEGER DEFAULT 1,
   explanation TEXT,
   media_url VARCHAR,
   option_count INTEGER NOT NULL,
   option_1 VARCHAR NOT NULL,
   option_2 VARCHAR NOT NULL,
   option_3 VARCHAR,
   option_4 VARCHAR,
   option_5 VARCHAR,
   correct_answer INTEGER NOT NULL,
   created_at TIMESTAMP DEFAULT NOW()
);
```

## 🔧 API 엔드포인트

### 1. 퀴즈 생성

```typescript
POST /api/quiz
Content-Type: application/json

Request:
{
   "title": "퀴즈 제목",
   "description": "퀴즈 설명",
   "is_public": true
}

Response:
{
   "id": 1,
   "title": "퀴즈 제목",
   "description": "퀴즈 설명",
   "author_id": "user-uuid",
   "is_public": true,
   "created_at": "2024-12-01T00:00:00Z",
   "updated_at": "2024-12-01T00:00:00Z"
}
```

### 2. 문제 생성

```typescript
POST /api/quiz/question
Content-Type: application/json

Request:
{
   "quiz_id": 1,
   "question_number": 1,
   "question_text": "문제 제목",
   "question_type": "multiple_choice",
   "points": 1,
   "explanation": "정답 설명",
   "option_count": 3,
   "option_1": "선택지 1",
   "option_2": "선택지 2",
   "option_3": "선택지 3",
   "option_4": "",
   "option_5": "",
   "correct_answer": 2
}

Response:
{
   "id": 1,
   "quiz_id": 1,
   "question_number": 1,
   "question_text": "문제 제목",
   "question_type": "multiple_choice",
   "points": 1,
   "explanation": "정답 설명",
   "option_count": 3,
   "option_1": "선택지 1",
   "option_2": "선택지 2",
   "option_3": "선택지 3",
   "option_4": null,
   "option_5": null,
   "correct_answer": 2,
   "created_at": "2024-12-01T00:00:00Z"
}
```

## 🚀 구현 세부사항

### 1. 상태 관리

- React useState를 사용한 폼 상태 관리
- 실시간 유효성 검사
- 에러 상태 분리 관리

### 2. API 통신 구조

```typescript
// 퀴즈 생성 훅
const submitQuiz = async () => {
   // 1. 클라이언트 유효성 검사
   const validation = validateForm()
   if (!validation.isValid) {
      setErrors(validation.errors)
      return
   }

   // 2. 퀴즈 생성 API 호출
   const quizResponse = await fetch('/api/quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(quizData),
   })

   if (!quizResponse.ok) {
      const errorData = await quizResponse.json()
      throw new Error(errorData.error)
   }

   const quiz = await quizResponse.json()

   // 3. 문제들 생성 API 호출
   for (const question of form.questions) {
      const questionResponse = await fetch('/api/quiz/question', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ ...question, quiz_id: quiz.id }),
      })

      if (!questionResponse.ok) {
         const errorData = await questionResponse.json()
         throw new Error(errorData.error)
      }
   }

   // 4. 성공 시 리다이렉트
   router.push(`/quiz/${quiz.id}`)
}
```

### 3. 타입 정의

```typescript
interface IQuizForm {
   title: string
   description: string
   is_public: boolean
   time_limit?: number
   pass_score: number
   questions: Array<{
      question_number: number
      question_text: string
      explanation: string
      option_1: string
      option_2: string
      option_3: string
      option_4: string
      option_5: string
      option_count: number
      correct_answer: number
   }>
}
```

## 📋 체크리스트

### 개발 완료 항목

- [x] 페이지 레벨 로그인 검증
- [x] API 레벨 사용자 인증
- [x] 퀴즈 제목 필수 입력 검증
- [x] 문제 제목 필수 입력 검증
- [x] 선택지 최소 2개, 최대 5개 제한
- [x] 정답 번호 유효성 검사
- [x] 실시간 선택지 개수 표시
- [x] 동적 UI (추가/삭제 버튼)
- [x] 에러 메시지 표시
- [x] API 엔드포인트 연동
- [x] 데이터베이스 저장
- [x] 성공 시 리다이렉트

### 향후 개선 사항

- [ ] 이미지/미디어 첨부 기능
- [ ] 문제 순서 변경 기능
- [ ] 퀴즈 템플릿 기능
- [ ] 퀴즈 미리보기 기능
- [ ] 퀴즈 복사 기능
- [ ] 퀴즈 카테고리 분류
- [ ] 퀴즈 태그 기능

## 🔒 보안 고려사항

### 1. 인증 및 권한

- **이중 검증**: 페이지 레벨 + API 레벨에서 사용자 확인
- **세션 관리**: Supabase Auth를 통한 안전한 세션 관리
- **권한 분리**: 퀴즈 수정/삭제는 작성자만 가능

### 2. 입력 검증

- **클라이언트 검증**: 사용자 경험 향상을 위한 즉시 피드백
- **서버 검증**: 보안을 위한 최종 검증
- **XSS 방지**: 입력 데이터 정제 및 이스케이프

### 3. 데이터 무결성

- **트랜잭션**: 퀴즈와 문제 생성의 원자성 보장
- **외래키 제약**: 데이터 일관성 유지
- **에러 처리**: 상세한 에러 메시지와 적절한 상태 코드

---

**문서 버전**: 2.0  
**최종 업데이트**: 2024년 12월  
**작성자**: 개발팀
