-- Supabase cron job 정리 스크립트
-- 현재 실행 중인 cron job들을 확인하고 삭제합니다.

-- 1. 현재 등록된 cron job들 조회
SELECT * FROM cron.job;

-- 2. update_stats 관련 cron job들 삭제
-- (jobname이 NULL이거나 update_stats 관련인 것들)
DELETE FROM cron.job 
WHERE command LIKE '%update_stats%' 
   OR command LIKE '%SELECT public.update_stats()%';

-- 3. 모든 cron job 삭제 (필요한 경우)
-- DELETE FROM cron.job WHERE active = true;

-- 4. 삭제 후 확인
SELECT * FROM cron.job;

-- 참고: 특정 jobid로 삭제하는 경우
-- SELECT cron.unschedule(1); -- jobid가 1인 경우
-- SELECT cron.unschedule(2); -- jobid가 2인 경우
-- SELECT cron.unschedule(3); -- jobid가 3인 경우
-- SELECT cron.unschedule(4); -- jobid가 4인 경우
-- SELECT cron.unschedule(5); -- jobid가 5인 경우
-- SELECT cron.unschedule(6); -- jobid가 6인 경우 