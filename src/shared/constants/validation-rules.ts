// 닉네임 검증 상수
export const NICKNAME_RULES = {
   MIN_LENGTH: 2,
   MAX_LENGTH: 20,
   PATTERN: /^[A-Za-z\d가-힣ㄱ-ㅎㅏ-ㅣ\-_\.@]+$/,
   ERROR_MESSAGES: {
      MIN_LENGTH: '닉네임은 2자 이상이어야 합니다.',
      MAX_LENGTH: '닉네임은 20자 이하이어야 합니다.',
      PATTERN: '문자, 숫자, 특수문자(-, _, ., @)만 허용됩니다.',
   },
} as const

// 비밀번호 검증 상수 (게시글/댓글용)
export const POST_PASSWORD_RULES = {
   MIN_LENGTH: 4,
   MAX_LENGTH: 10,
   PATTERN: /^[A-Za-z\d가-힣ㄱ-ㅎㅏ-ㅣ]+$/,
   ERROR_MESSAGES: {
      MIN_LENGTH: '비밀번호는 4자 이상이어야 합니다.',
      MAX_LENGTH: '비밀번호는 10자 이하이어야 합니다.',
      PATTERN: '비밀번호는 문자, 숫자만 가능합니다',
   },
} as const

// 게시글 검증 상수
export const POST_RULES = {
   TITLE_MIN_LENGTH: 2,
   CONTENT_MIN_LENGTH: 2,
   SUMMARY_MAX_LENGTH: 160,
   ERROR_MESSAGES: {
      TITLE: '제목을 입력해주세요.',
      CONTENT: '내용을 입력해주세요.',
      SUMMARY: '요약은 최대 160자 이하로 작성해주세요.',
   },
} as const

// 댓글 검증 상수
export const COMMENT_RULES = {
   CONTENT_MIN_LENGTH: 1,
   ERROR_MESSAGES: {
      CONTENT: '댓글 내용을 입력해주세요.',
   },
} as const

// 파일 업로드 상수
export const FILE_UPLOAD_RULES = {
   MAX_SIZE_MB: 10,
   MAX_SIZE_BYTES: 10 * 1024 * 1024,
   MAX_COUNT: 10,
   ALLOWED_TYPES: ['image/png', 'image/jpeg', 'image/jpg'] as const,
   SIZE_UNITS: {
      BYTES: 1024,
      KB: 1024,
      MB: 1048576,
   },
} as const

// 퀴증 검증 상수
export const QUIZ_RULES = {
   MIN_OPTIONS: 2,
   MAX_OPTIONS: 5,
   DEFAULT_PASS_SCORE: 60,
   MIN_CORRECT_ANSWER: 1,
} as const

// 애니메이션 상수
export const ANIMATION_DURATION = {
   DELAY_MS: 300,
   SCORE_COUNT_MS: 2000,
   STEPS: 60,
} as const

// 날짜 관련 상수
export const DATE_RULES = {
   RELATIVE_TIME_DAYS: 7,
} as const
