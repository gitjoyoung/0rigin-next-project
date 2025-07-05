-- 개발 환경용 시드 데이터
-- 이 파일은 로컬 개발 환경에서 테스트용 데이터를 생성합니다.

-- =============================================
-- 테스트 사용자 프로필 생성
-- =============================================
INSERT INTO profile (id, email, nickname, bio, is_active, signup_complete) VALUES
('00000000-0000-0000-0000-000000000001', 'admin@example.com', '관리자', '테스트용 관리자 계정입니다.', true, true),
('00000000-0000-0000-0000-000000000002', 'user1@example.com', '사용자1', '테스트용 사용자 계정입니다.', true, true),
('00000000-0000-0000-0000-000000000003', 'user2@example.com', '사용자2', '테스트용 사용자 계정입니다.', true, true);

-- =============================================
-- 테스트 게시글 생성
-- =============================================
INSERT INTO posts (title, content, excerpt, category_id, author_id, nickname, status, view_count) VALUES
('첫 번째 게시글', '{"content": "안녕하세요! 첫 번째 게시글입니다."}', '안녕하세요! 첫 번째 게시글입니다.', 
 (SELECT id FROM categories WHERE slug = 'free'), 
 '00000000-0000-0000-0000-000000000001', '관리자', 'published', 10),
 
('개발 관련 질문입니다', '{"content": "Next.js에서 Supabase 연동하는 방법을 알고 싶습니다."}', 'Next.js에서 Supabase 연동하는 방법을 알고 싶습니다.', 
 (SELECT id FROM categories WHERE slug = 'qna'), 
 '00000000-0000-0000-0000-000000000002', '사용자1', 'published', 25),

('리액트 훅 사용법', '{"content": "useState와 useEffect의 차이점에 대해 알아보겠습니다."}', 'useState와 useEffect의 차이점에 대해 알아보겠습니다.', 
 (SELECT id FROM categories WHERE slug = 'dev'), 
 '00000000-0000-0000-0000-000000000001', '관리자', 'published', 50);

-- =============================================
-- 테스트 댓글 생성
-- =============================================
INSERT INTO comments (post_id, author_id, nickname, content, depth) VALUES
(1, '00000000-0000-0000-0000-000000000002', '사용자1', '좋은 글이네요!', 0),
(1, '00000000-0000-0000-0000-000000000003', '사용자2', '저도 동감합니다.', 0),
(2, '00000000-0000-0000-0000-000000000001', '관리자', '공식 문서를 참고해보세요.', 0);

-- =============================================
-- 테스트 퀴즈 생성
-- =============================================
INSERT INTO quizzes (title, description, author_id, is_public, pass_score) VALUES
('JavaScript 기초 퀴즈', 'JavaScript의 기본 문법을 테스트하는 퀴즈입니다.', '00000000-0000-0000-0000-000000000001', true, 70),
('React 기초 퀴즈', 'React의 기본 개념을 테스트하는 퀴즈입니다.', '00000000-0000-0000-0000-000000000001', true, 80);

-- =============================================
-- 테스트 퀴즈 문제 생성
-- =============================================
INSERT INTO quiz_questions (quiz_id, question_number, question_text, option_1, option_2, option_3, option_4, option_count, correct_answer, explanation) VALUES
(1, 1, 'JavaScript에서 변수를 선언하는 키워드가 아닌 것은?', 'var', 'let', 'const', 'int', 4, 4, 'JavaScript에서는 int 키워드가 없습니다.'),
(1, 2, 'JavaScript에서 배열의 길이를 구하는 속성은?', 'size', 'length', 'count', 'total', 4, 2, 'JavaScript 배열에서는 length 속성을 사용합니다.'),
(2, 1, 'React에서 상태를 관리하는 훅은?', 'useState', 'useEffect', 'useCallback', 'useMemo', 4, 1, 'useState는 React에서 상태를 관리하는 기본 훅입니다.');

-- =============================================
-- 테스트 포인트 데이터 생성
-- =============================================
INSERT INTO points (user_id, points, source) VALUES
('00000000-0000-0000-0000-000000000001', 100, 'signup_bonus'),
('00000000-0000-0000-0000-000000000002', 50, 'signup_bonus'),
('00000000-0000-0000-0000-000000000003', 50, 'signup_bonus'),
('00000000-0000-0000-0000-000000000002', 10, 'post_created'),
('00000000-0000-0000-0000-000000000001', 20, 'quiz_created');

-- =============================================
-- 테스트 일일 통계 데이터 생성
-- =============================================
INSERT INTO daily_stats (date, user_count, post_count, visitor_count) VALUES
('2025-07-01', 3, 2, 45),
('2025-07-02', 1, 1, 38),
('2025-07-03', 2, 0, 52),
('2025-07-04', 0, 1, 41),
('2025-07-05', 1, 2, 33);

-- =============================================
-- 테스트 방문자 데이터 생성
-- =============================================
INSERT INTO visitors (visitor_id, page_url, visit_date, browser, os, device_type) VALUES
('visitor_001', '/', '2025-07-05', 'Chrome', 'macOS', 'desktop'),
('visitor_002', '/board/free', '2025-07-05', 'Safari', 'iOS', 'mobile'),
('visitor_003', '/quiz', '2025-07-05', 'Firefox', 'Windows', 'desktop'),
('visitor_004', '/board/qna', '2025-07-05', 'Chrome', 'Android', 'mobile');

-- =============================================
-- 개발 환경용 알림 메시지
-- =============================================
DO $$ 
BEGIN
    RAISE NOTICE '===========================================';
    RAISE NOTICE '개발 환경용 시드 데이터가 생성되었습니다.';
    RAISE NOTICE '- 테스트 사용자: 3명';
    RAISE NOTICE '- 테스트 게시글: 3개';
    RAISE NOTICE '- 테스트 댓글: 3개';
    RAISE NOTICE '- 테스트 퀴즈: 2개';
    RAISE NOTICE '- 테스트 퀴즈 문제: 3개';
    RAISE NOTICE '- 테스트 포인트: 5개';
    RAISE NOTICE '- 테스트 통계: 5일치';
    RAISE NOTICE '- 테스트 방문자: 4명';
    RAISE NOTICE '===========================================';
END $$; 