-- 방문자 수 증가 프로시저
CREATE OR REPLACE PROCEDURE public.increment_visitor_count()
LANGUAGE plpgsql
AS $$
DECLARE
    v_count INTEGER;
BEGIN
    -- 트랜잭션 시작
    BEGIN
        -- 오늘 날짜의 통계가 없으면 생성
        IF NOT EXISTS (SELECT 1 FROM daily_stats WHERE date = CURRENT_DATE) THEN
            INSERT INTO daily_stats (date, visitor_count, unique_visitor_count)
            VALUES (CURRENT_DATE, 1, 1);
        ELSE
            -- 고유 방문자인지 확인
            SELECT COUNT(*) INTO v_count
            FROM visitors
            WHERE visitor_id = NEW.visitor_id
            AND visit_date = CURRENT_DATE;

            -- 오늘 날짜의 방문자 수 증가
            UPDATE daily_stats
            SET 
                visitor_count = visitor_count + 1,
                unique_visitor_count = CASE 
                    WHEN v_count = 0 THEN unique_visitor_count + 1
                    ELSE unique_visitor_count
                END,
                updated_at = NOW()
            WHERE date = CURRENT_DATE;
        END IF;
    EXCEPTION
        WHEN OTHERS THEN
            -- 에러 로깅
            RAISE NOTICE 'Error in increment_visitor_count: %', SQLERRM;
            -- 트랜잭션 롤백
            RAISE;
    END;
END;
$$;

-- 방문자 추가 시 방문자 수 증가 트리거
CREATE OR REPLACE FUNCTION public.increment_visitor_count_trigger()
RETURNS TRIGGER AS $$
BEGIN
    CALL public.increment_visitor_count();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- visitors 테이블에 트리거 설정
DROP TRIGGER IF EXISTS trigger_increment_visitor_count ON visitors;
CREATE TRIGGER trigger_increment_visitor_count
AFTER INSERT ON visitors
FOR EACH ROW
EXECUTE FUNCTION public.increment_visitor_count_trigger();

-- 통계 업데이트 함수 수정
CREATE OR REPLACE FUNCTION public.update_stats()
RETURNS void AS $$
BEGIN
    -- 트랜잭션 시작
    BEGIN
        -- 오늘 날짜 데이터 존재 여부 확인
        IF EXISTS (SELECT 1 FROM daily_stats WHERE date = CURRENT_DATE) THEN
            -- 존재하면 업데이트
            UPDATE daily_stats
            SET 
                post_count = (SELECT COUNT(*) FROM posts),
                user_count = (SELECT COUNT(*) FROM users),
                visitor_count = (SELECT COUNT(*) FROM visitors WHERE visit_date = CURRENT_DATE),
                unique_visitor_count = (SELECT COUNT(DISTINCT visitor_id) FROM visitors WHERE visit_date = CURRENT_DATE),
                updated_at = NOW()
            WHERE date = CURRENT_DATE;
        ELSE
            -- 존재하지 않으면 새로 삽입
            INSERT INTO daily_stats (date, post_count, user_count, visitor_count, unique_visitor_count)
            VALUES (
                CURRENT_DATE,
                (SELECT COUNT(*) FROM posts),
                (SELECT COUNT(*) FROM users),
                (SELECT COUNT(*) FROM visitors WHERE visit_date = CURRENT_DATE),
                (SELECT COUNT(DISTINCT visitor_id) FROM visitors WHERE visit_date = CURRENT_DATE)
            );
        END IF;
    EXCEPTION
        WHEN OTHERS THEN
            -- 에러 로깅
            RAISE NOTICE 'Error in update_stats: %', SQLERRM;
            -- 트랜잭션 롤백
            RAISE;
    END;
END;
$$ LANGUAGE plpgsql; 