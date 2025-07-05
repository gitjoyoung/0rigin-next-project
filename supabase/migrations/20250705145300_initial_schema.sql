-- 초기 데이터베이스 스키마 생성
-- 생성일: 2025-07-05

-- =============================================
-- 1. 카테고리 테이블
-- =============================================
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT,
    can_write BOOLEAN DEFAULT true,
    is_active BOOLEAN DEFAULT true,
    order_index INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- =============================================
-- 2. 프로필 테이블
-- =============================================
CREATE TABLE IF NOT EXISTS profile (
    id UUID PRIMARY KEY,
    email TEXT NOT NULL,
    nickname TEXT NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    gender TEXT,
    is_active BOOLEAN DEFAULT true,
    is_email_verified BOOLEAN DEFAULT false,
    signup_complete BOOLEAN DEFAULT false,
    last_login_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- =============================================
-- 3. 게시글 테이블
-- =============================================
CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content JSONB NOT NULL,
    excerpt TEXT,
    summary TEXT,
    thumbnail TEXT,
    tags TEXT[],
    category TEXT,
    category_id UUID REFERENCES categories(id),
    author_id UUID REFERENCES profile(id),
    nickname TEXT,
    password TEXT,
    status TEXT DEFAULT 'published',
    is_pinned BOOLEAN DEFAULT false,
    view_count INTEGER DEFAULT 0,
    reading_time INTEGER,
    slug TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- =============================================
-- 4. 댓글 테이블
-- =============================================
CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    parent_id INTEGER REFERENCES comments(id) ON DELETE CASCADE,
    author_id UUID REFERENCES profile(id),
    nickname TEXT NOT NULL,
    content TEXT NOT NULL,
    password TEXT,
    is_guest BOOLEAN DEFAULT false,
    is_approved BOOLEAN DEFAULT true,
    is_edited BOOLEAN DEFAULT false,
    likes INTEGER DEFAULT 0,
    depth INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- =============================================
-- 5. 게시글 좋아요 테이블
-- =============================================
CREATE TABLE IF NOT EXISTS post_likes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profile(id),
    anon_key TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- =============================================
-- 6. 포인트 테이블
-- =============================================
CREATE TABLE IF NOT EXISTS points (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES profile(id),
    points INTEGER NOT NULL,
    source TEXT NOT NULL,
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- =============================================
-- 7. 퀴즈 테이블
-- =============================================
CREATE TABLE IF NOT EXISTS quizzes (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    author_id UUID REFERENCES profile(id),
    is_public BOOLEAN DEFAULT true,
    pass_score INTEGER,
    time_limit INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- =============================================
-- 8. 퀴즈 문제 테이블
-- =============================================
CREATE TABLE IF NOT EXISTS quiz_questions (
    id SERIAL PRIMARY KEY,
    quiz_id INTEGER NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
    question_number INTEGER NOT NULL,
    question_text TEXT NOT NULL,
    question_type TEXT DEFAULT 'multiple_choice',
    option_1 TEXT NOT NULL,
    option_2 TEXT NOT NULL,
    option_3 TEXT,
    option_4 TEXT,
    option_5 TEXT,
    option_count INTEGER NOT NULL,
    correct_answer INTEGER NOT NULL,
    explanation TEXT,
    media_url TEXT,
    points INTEGER DEFAULT 1
);

-- =============================================
-- 9. 퀴즈 시도 테이블
-- =============================================
CREATE TABLE IF NOT EXISTS quiz_attempts (
    id SERIAL PRIMARY KEY,
    quiz_id INTEGER NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profile(id),
    total_questions INTEGER NOT NULL,
    correct_answers INTEGER,
    score INTEGER,
    passed BOOLEAN,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- =============================================
-- 10. 퀴즈 답변 테이블
-- =============================================
CREATE TABLE IF NOT EXISTS quiz_answers (
    id SERIAL PRIMARY KEY,
    attempt_id INTEGER NOT NULL REFERENCES quiz_attempts(id) ON DELETE CASCADE,
    question_id INTEGER NOT NULL REFERENCES quiz_questions(id) ON DELETE CASCADE,
    selected_option INTEGER NOT NULL,
    is_correct BOOLEAN NOT NULL,
    time_spent INTEGER
);

-- =============================================
-- 11. 일일 통계 테이블
-- =============================================
CREATE TABLE IF NOT EXISTS daily_stats (
    id SERIAL PRIMARY KEY,
    date TEXT NOT NULL UNIQUE,
    user_count INTEGER DEFAULT 0,
    post_count INTEGER DEFAULT 0,
    visitor_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- =============================================
-- 12. 방문자 테이블
-- =============================================
CREATE TABLE IF NOT EXISTS visitors (
    id SERIAL PRIMARY KEY,
    visitor_id TEXT NOT NULL,
    page_url TEXT NOT NULL,
    visit_date TEXT DEFAULT to_char(now(), 'YYYY-MM-DD'),
    visit_timestamp TIMESTAMP WITH TIME ZONE DEFAULT now(),
    ip_address TEXT,
    referrer TEXT,
    browser TEXT,
    os TEXT,
    device_type TEXT,
    screen_size TEXT,
    language TEXT
);

-- =============================================
-- 인덱스 생성
-- =============================================
CREATE INDEX IF NOT EXISTS idx_posts_category_id ON posts(category_id);
CREATE INDEX IF NOT EXISTS idx_posts_author_id ON posts(author_id);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at);
CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id);
CREATE INDEX IF NOT EXISTS idx_comments_parent_id ON comments(parent_id);
CREATE INDEX IF NOT EXISTS idx_post_likes_post_id ON post_likes(post_id);
CREATE INDEX IF NOT EXISTS idx_post_likes_user_id ON post_likes(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_questions_quiz_id ON quiz_questions(quiz_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_quiz_id ON quiz_attempts(quiz_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user_id ON quiz_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_answers_attempt_id ON quiz_answers(attempt_id);
CREATE INDEX IF NOT EXISTS idx_quiz_answers_question_id ON quiz_answers(question_id);
CREATE INDEX IF NOT EXISTS idx_daily_stats_date ON daily_stats(date);
CREATE INDEX IF NOT EXISTS idx_visitors_visitor_id ON visitors(visitor_id);
CREATE INDEX IF NOT EXISTS idx_visitors_visit_date ON visitors(visit_date);

-- =============================================
-- 함수 생성
-- =============================================

-- 조회수 증가 함수
CREATE OR REPLACE FUNCTION increment_view_count(post_id INTEGER)
RETURNS void AS $$
BEGIN
    UPDATE posts 
    SET view_count = view_count + 1 
    WHERE id = post_id;
END;
$$ LANGUAGE plpgsql;

-- 방문자 수 증가 함수
CREATE OR REPLACE FUNCTION increment_visitor_count(session_id_param TEXT)
RETURNS void AS $$
DECLARE
    today_date TEXT := to_char(now(), 'YYYY-MM-DD');
BEGIN
    -- 방문자 테이블에 기록
    INSERT INTO visitors (visitor_id, page_url, visit_date)
    VALUES (session_id_param, '/', today_date)
    ON CONFLICT DO NOTHING;
    
    -- 일일 통계 업데이트
    INSERT INTO daily_stats (date, visitor_count)
    VALUES (today_date, 1)
    ON CONFLICT (date) 
    DO UPDATE SET visitor_count = daily_stats.visitor_count + 1;
END;
$$ LANGUAGE plpgsql;

-- 통계 업데이트 함수
CREATE OR REPLACE FUNCTION update_stats()
RETURNS void AS $$
DECLARE
    today_date TEXT := to_char(now(), 'YYYY-MM-DD');
    user_count_today INTEGER;
    post_count_today INTEGER;
BEGIN
    -- 오늘 가입한 사용자 수
    SELECT COUNT(*) INTO user_count_today
    FROM profile 
    WHERE DATE(created_at) = today_date::date;
    
    -- 오늘 작성된 게시글 수
    SELECT COUNT(*) INTO post_count_today
    FROM posts 
    WHERE DATE(created_at) = today_date::date;
    
    -- 일일 통계 업데이트
    INSERT INTO daily_stats (date, user_count, post_count)
    VALUES (today_date, user_count_today, post_count_today)
    ON CONFLICT (date) 
    DO UPDATE SET 
        user_count = user_count_today,
        post_count = post_count_today;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- 트리거 생성
-- =============================================

-- updated_at 자동 업데이트 트리거 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 각 테이블에 updated_at 트리거 설정
CREATE TRIGGER update_categories_updated_at
    BEFORE UPDATE ON categories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profile_updated_at
    BEFORE UPDATE ON profile
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posts_updated_at
    BEFORE UPDATE ON posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at
    BEFORE UPDATE ON comments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quizzes_updated_at
    BEFORE UPDATE ON quizzes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_daily_stats_updated_at
    BEFORE UPDATE ON daily_stats
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- 기본 데이터 삽입
-- =============================================

-- 기본 카테고리 생성
INSERT INTO categories (name, slug, description, icon, order_index) VALUES
('자유게시판', 'free', '자유로운 주제로 소통하는 공간입니다.', '💬', 1),
('질문과답변', 'qna', '궁금한 것들을 질문하고 답변하는 공간입니다.', '❓', 2),
('개발', 'dev', '개발 관련 이야기를 나누는 공간입니다.', '💻', 3),
('공지사항', 'notice', '중요한 공지사항을 확인하는 공간입니다.', '📢', 4)
ON CONFLICT (slug) DO NOTHING;

COMMENT ON TABLE categories IS '게시판 카테고리 테이블';
COMMENT ON TABLE profile IS '사용자 프로필 테이블';
COMMENT ON TABLE posts IS '게시글 테이블';
COMMENT ON TABLE comments IS '댓글 테이블';
COMMENT ON TABLE post_likes IS '게시글 좋아요 테이블';
COMMENT ON TABLE points IS '사용자 포인트 테이블';
COMMENT ON TABLE quizzes IS '퀴즈 테이블';
COMMENT ON TABLE quiz_questions IS '퀴즈 문제 테이블';
COMMENT ON TABLE quiz_attempts IS '퀴즈 시도 기록 테이블';
COMMENT ON TABLE quiz_answers IS '퀴즈 답변 테이블';
COMMENT ON TABLE daily_stats IS '일일 통계 테이블';
COMMENT ON TABLE visitors IS '방문자 로그 테이블'; 