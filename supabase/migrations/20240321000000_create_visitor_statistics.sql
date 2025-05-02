-- 방문자 통계 테이블 생성
CREATE TABLE IF NOT EXISTS visitor_statistics (
    id BIGSERIAL PRIMARY KEY,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    total_visitors INTEGER NOT NULL DEFAULT 0,
    new_visitors INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_visitor_statistics_date ON visitor_statistics(date);

-- 트리거 함수 생성
CREATE OR REPLACE FUNCTION update_visitor_statistics()
RETURNS TRIGGER AS $$
BEGIN
    -- 오늘 날짜의 통계가 없으면 새로 생성
    INSERT INTO visitor_statistics (date, total_visitors, new_visitors)
    VALUES (CURRENT_DATE, 1, 1)
    ON CONFLICT (date) DO UPDATE
    SET 
        total_visitors = visitor_statistics.total_visitors + 1,
        new_visitors = CASE 
            WHEN NEW.is_new_visitor THEN visitor_statistics.new_visitors + 1
            ELSE visitor_statistics.new_visitors
        END,
        updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 트리거 생성
DROP TRIGGER IF EXISTS trigger_update_visitor_statistics ON visitors;
CREATE TRIGGER trigger_update_visitor_statistics
AFTER INSERT ON visitors
FOR EACH ROW
EXECUTE FUNCTION update_visitor_statistics(); 