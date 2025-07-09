

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pg_cron" WITH SCHEMA "pg_catalog";






CREATE EXTENSION IF NOT EXISTS "pgsodium";






CREATE SCHEMA IF NOT EXISTS "private";


ALTER SCHEMA "private" OWNER TO "postgres";


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE OR REPLACE FUNCTION "private"."sync_public_profile"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
  UPDATE public.profile
  SET
    nickname = NEW.nickname,
    avatar_url = NEW.avatar_url,
    bio = NEW.bio,
    updated_at = now()
  WHERE id = NEW.id;

  RETURN NEW;
END;
$$;


ALTER FUNCTION "private"."sync_public_profile"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
  _gender TEXT := COALESCE(NEW.raw_user_meta_data->>'gender', 'etc');
  _nickname TEXT := COALESCE(NEW.raw_user_meta_data->>'nickname',
                             'Holder_' || LEFT(REPLACE(NEW.id::text, '-', ''), 13));
  _avatar_url TEXT := NEW.raw_user_meta_data->>'avatar_url';
  _bio TEXT := NEW.raw_user_meta_data->>'bio';
BEGIN
  IF _gender NOT IN ('man', 'women', 'etc') THEN
    _gender := 'etc';
  END IF;

  INSERT INTO public.profile (
    id,
    email,
    nickname,
    gender,
    avatar_url,
    bio,
    is_email_verified
  )
  VALUES (
    NEW.id,
    NEW.email,
    _nickname,
    _gender,
    _avatar_url,
    _bio,
    COALESCE(NEW.email_confirmed_at IS NOT NULL, FALSE)
  );

  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."increment_view_count"("post_id" bigint) RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
  UPDATE public.posts
  SET view_count = view_count + 1
  WHERE id = post_id;
END;
$$;


ALTER FUNCTION "public"."increment_view_count"("post_id" bigint) OWNER TO "postgres";


CREATE PROCEDURE "public"."increment_visitor_count"(IN "p_visitor_id" "text")
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  BEGIN
    INSERT INTO daily_visitor_log (date, visitor_id)
    VALUES (CURRENT_DATE, p_visitor_id);
  EXCEPTION WHEN unique_violation THEN
    RETURN; -- 중복이면 무시
  END;
END;
$$;


ALTER PROCEDURE "public"."increment_visitor_count"(IN "p_visitor_id" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."increment_visitor_count"("session_id_param" character varying) RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  -- 해당 세션 ID로 오늘 방문 기록이 있는지 확인
  IF NOT EXISTS (
    SELECT 1 FROM visitors 
    WHERE session_id = session_id_param 
    AND visit_date = CURRENT_DATE
  ) THEN
    -- 방문 기록이 없으면 새로 추가
    INSERT INTO visitors (session_id, visit_date)
    VALUES (session_id_param, CURRENT_DATE);
    
    -- daily_stats 테이블의 방문자 수 업데이트
    UPDATE daily_stats
    SET visitor_count = visitor_count + 1,
        updated_at = NOW()
    WHERE date = CURRENT_DATE;
  END IF;
END;
$$;


ALTER FUNCTION "public"."increment_visitor_count"("session_id_param" character varying) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_post_updated_at"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."update_post_updated_at"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_stats"() RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  IF EXISTS (SELECT 1 FROM daily_stats WHERE date = CURRENT_DATE) THEN
    UPDATE daily_stats
    SET 
      post_count = (SELECT COUNT(*) FROM pub.posts),
      user_count = (SELECT COUNT(*) FROM public.profiles),
      visitor_count = (SELECT COUNT(*) FROM daily_visitor_log WHERE date = CURRENT_DATE),
      updated_at = NOW()
    WHERE date = CURRENT_DATE;
  ELSE
    INSERT INTO daily_stats (date, post_count, user_count, visitor_count)
    VALUES (
      CURRENT_DATE,
      (SELECT COUNT(*) FROM pub.posts),
      (SELECT COUNT(*) FROM public.profiles),
      (SELECT COUNT(*) FROM daily_visitor_log WHERE date = CURRENT_DATE)
    );
  END IF;
END;
$$;


ALTER FUNCTION "public"."update_stats"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_updated_at_column"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."update_updated_at_column"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."categories" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "slug" "text" NOT NULL,
    "description" "text",
    "icon" "text",
    "order_index" integer,
    "is_active" boolean DEFAULT true,
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "can_write" boolean DEFAULT true NOT NULL
);


ALTER TABLE "public"."categories" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."comments" (
    "id" bigint NOT NULL,
    "post_id" bigint NOT NULL,
    "parent_id" bigint,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "content" "text" NOT NULL,
    "author_id" "uuid",
    "nickname" "text" NOT NULL,
    "password" "text",
    "is_guest" boolean DEFAULT false NOT NULL,
    "likes" integer DEFAULT 0 NOT NULL,
    "is_approved" boolean DEFAULT true NOT NULL,
    "is_edited" boolean DEFAULT false NOT NULL,
    "depth" integer DEFAULT 0 NOT NULL,
    CONSTRAINT "user_or_guest" CHECK (((("author_id" IS NOT NULL) AND ("is_guest" = false) AND ("password" IS NULL)) OR (("author_id" IS NULL) AND ("is_guest" = true) AND ("password" IS NOT NULL)))),
    CONSTRAINT "valid_depth" CHECK (((("parent_id" IS NULL) AND ("depth" = 0)) OR (("parent_id" IS NOT NULL) AND ("depth" > 0))))
);


ALTER TABLE "public"."comments" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."comments_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."comments_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."comments_id_seq" OWNED BY "public"."comments"."id";



CREATE TABLE IF NOT EXISTS "public"."daily_stats" (
    "id" bigint NOT NULL,
    "date" "date" NOT NULL,
    "post_count" integer DEFAULT 0 NOT NULL,
    "user_count" integer DEFAULT 0 NOT NULL,
    "visitor_count" integer DEFAULT 0 NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."daily_stats" OWNER TO "postgres";


ALTER TABLE "public"."daily_stats" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."daily_stats_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."daily_visitor_log" (
    "date" "date" NOT NULL,
    "visitor_id" "text" NOT NULL
);


ALTER TABLE "public"."daily_visitor_log" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."points" (
    "id" bigint NOT NULL,
    "user_id" "uuid" NOT NULL,
    "points" integer NOT NULL,
    "source" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "earned_at" "date" DEFAULT CURRENT_DATE
);


ALTER TABLE "public"."points" OWNER TO "postgres";


ALTER TABLE "public"."points" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "public"."points_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."post_likes" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "post_id" bigint NOT NULL,
    "user_id" "uuid",
    "anon_key" "uuid",
    "deleted_at" timestamp with time zone,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "chk_owner_one" CHECK (((("user_id" IS NOT NULL) AND ("anon_key" IS NULL)) OR (("user_id" IS NULL) AND ("anon_key" IS NOT NULL))))
);


ALTER TABLE "public"."post_likes" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."posts" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "title" "text" NOT NULL,
    "slug" "text",
    "excerpt" "text",
    "summary" "text",
    "content" "jsonb" NOT NULL,
    "thumbnail" "text",
    "author_id" "uuid",
    "nickname" "text",
    "password" "text",
    "view_count" integer DEFAULT 0 NOT NULL,
    "reading_time" integer,
    "tags" "text"[],
    "is_pinned" boolean DEFAULT false NOT NULL,
    "category" "text",
    "status" "text" DEFAULT 'published'::"text" NOT NULL,
    "category_id" "uuid",
    CONSTRAINT "posts_status_check" CHECK (("status" = ANY (ARRAY['published'::"text", 'draft'::"text", 'private'::"text"])))
);


ALTER TABLE "public"."posts" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."posts_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."posts_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."posts_id_seq" OWNED BY "public"."posts"."id";



CREATE TABLE IF NOT EXISTS "public"."profile" (
    "id" "uuid" NOT NULL,
    "email" "text" NOT NULL,
    "nickname" "text" NOT NULL,
    "gender" "text",
    "avatar_url" "text",
    "bio" "text",
    "is_email_verified" boolean DEFAULT false,
    "signup_complete" boolean DEFAULT false,
    "is_active" boolean DEFAULT true,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "last_login_at" timestamp with time zone,
    CONSTRAINT "profile_gender_check" CHECK (("gender" = ANY (ARRAY['man'::"text", 'women'::"text", 'etc'::"text"])))
);


ALTER TABLE "public"."profile" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."quiz_answers" (
    "id" bigint NOT NULL,
    "attempt_id" bigint NOT NULL,
    "question_id" bigint NOT NULL,
    "selected_option" integer NOT NULL,
    "is_correct" boolean NOT NULL,
    "time_spent" integer
);


ALTER TABLE "public"."quiz_answers" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."quiz_answers_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."quiz_answers_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."quiz_answers_id_seq" OWNED BY "public"."quiz_answers"."id";



CREATE TABLE IF NOT EXISTS "public"."quiz_attempts" (
    "id" bigint NOT NULL,
    "quiz_id" bigint NOT NULL,
    "user_id" "uuid" NOT NULL,
    "started_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "completed_at" timestamp with time zone,
    "score" integer,
    "total_questions" integer NOT NULL,
    "correct_answers" integer,
    "passed" boolean
);


ALTER TABLE "public"."quiz_attempts" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."quiz_attempts_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."quiz_attempts_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."quiz_attempts_id_seq" OWNED BY "public"."quiz_attempts"."id";



CREATE TABLE IF NOT EXISTS "public"."quiz_questions" (
    "id" bigint NOT NULL,
    "quiz_id" bigint NOT NULL,
    "question_number" integer NOT NULL,
    "question_text" "text" NOT NULL,
    "question_type" "text" DEFAULT 'multiple_choice'::"text" NOT NULL,
    "points" integer DEFAULT 1 NOT NULL,
    "explanation" "text",
    "media_url" "text",
    "option_count" integer NOT NULL,
    "option_1" "text" NOT NULL,
    "option_2" "text" NOT NULL,
    "option_3" "text",
    "option_4" "text",
    "option_5" "text",
    "correct_answer" integer NOT NULL,
    CONSTRAINT "quiz_questions_correct_answer_check" CHECK ((("correct_answer" >= 1) AND ("correct_answer" <= 5))),
    CONSTRAINT "quiz_questions_option_count_check" CHECK ((("option_count" >= 2) AND ("option_count" <= 5))),
    CONSTRAINT "valid_options_and_answer" CHECK (("correct_answer" <= "option_count"))
);


ALTER TABLE "public"."quiz_questions" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."quiz_questions_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."quiz_questions_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."quiz_questions_id_seq" OWNED BY "public"."quiz_questions"."id";



CREATE TABLE IF NOT EXISTS "public"."quizzes" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "title" "text" NOT NULL,
    "description" "text",
    "author_id" "uuid",
    "is_public" boolean DEFAULT true NOT NULL,
    "time_limit" integer,
    "pass_score" integer DEFAULT 60
);


ALTER TABLE "public"."quizzes" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."quizzes_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."quizzes_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."quizzes_id_seq" OWNED BY "public"."quizzes"."id";



CREATE TABLE IF NOT EXISTS "public"."visitors" (
    "id" bigint NOT NULL,
    "visit_date" "date" DEFAULT CURRENT_DATE NOT NULL,
    "visitor_id" "text" NOT NULL,
    "ip_address" "text",
    "device_type" "text",
    "browser" "text",
    "os" "text",
    "screen_size" "text",
    "language" "text",
    "referrer" "text",
    "page_url" "text" NOT NULL,
    "visit_timestamp" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."visitors" OWNER TO "postgres";


ALTER TABLE "public"."visitors" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."visitors_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



ALTER TABLE ONLY "public"."comments" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."comments_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."posts" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."posts_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."quiz_answers" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."quiz_answers_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."quiz_attempts" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."quiz_attempts_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."quiz_questions" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."quiz_questions_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."quizzes" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."quizzes_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."categories"
    ADD CONSTRAINT "categories_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."categories"
    ADD CONSTRAINT "categories_slug_key" UNIQUE ("slug");



ALTER TABLE ONLY "public"."comments"
    ADD CONSTRAINT "comments_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."daily_stats"
    ADD CONSTRAINT "daily_stats_date_key" UNIQUE ("date");



ALTER TABLE ONLY "public"."daily_stats"
    ADD CONSTRAINT "daily_stats_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."daily_visitor_log"
    ADD CONSTRAINT "daily_visitor_log_pkey" PRIMARY KEY ("date", "visitor_id");



ALTER TABLE ONLY "public"."points"
    ADD CONSTRAINT "points_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."post_likes"
    ADD CONSTRAINT "post_likes_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."posts"
    ADD CONSTRAINT "posts_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."posts"
    ADD CONSTRAINT "posts_slug_key" UNIQUE ("slug");



ALTER TABLE ONLY "public"."profile"
    ADD CONSTRAINT "profile_email_key" UNIQUE ("email");



ALTER TABLE ONLY "public"."profile"
    ADD CONSTRAINT "profile_nickname_key" UNIQUE ("nickname");



ALTER TABLE ONLY "public"."profile"
    ADD CONSTRAINT "profile_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."quiz_answers"
    ADD CONSTRAINT "quiz_answers_attempt_id_question_id_key" UNIQUE ("attempt_id", "question_id");



ALTER TABLE ONLY "public"."quiz_answers"
    ADD CONSTRAINT "quiz_answers_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."quiz_attempts"
    ADD CONSTRAINT "quiz_attempts_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."quiz_questions"
    ADD CONSTRAINT "quiz_questions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."quiz_questions"
    ADD CONSTRAINT "quiz_questions_quiz_id_question_number_key" UNIQUE ("quiz_id", "question_number");



ALTER TABLE ONLY "public"."quizzes"
    ADD CONSTRAINT "quizzes_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."visitors"
    ADD CONSTRAINT "visitors_pkey" PRIMARY KEY ("id");



CREATE INDEX "comments_author_id_idx" ON "public"."comments" USING "btree" ("author_id");



CREATE INDEX "comments_nickname_idx" ON "public"."comments" USING "btree" ("nickname");



CREATE INDEX "comments_parent_id_idx" ON "public"."comments" USING "btree" ("parent_id");



CREATE INDEX "comments_post_id_idx" ON "public"."comments" USING "btree" ("post_id");



CREATE INDEX "idx_points_user_id" ON "public"."points" USING "btree" ("user_id");



CREATE INDEX "idx_post_likes_anon" ON "public"."post_likes" USING "btree" ("anon_key");



CREATE INDEX "idx_post_likes_post" ON "public"."post_likes" USING "btree" ("post_id");



CREATE INDEX "idx_post_likes_user" ON "public"."post_likes" USING "btree" ("user_id");



CREATE INDEX "idx_quiz_answers_attempt_id" ON "public"."quiz_answers" USING "btree" ("attempt_id");



CREATE INDEX "idx_quiz_attempts_quiz_id" ON "public"."quiz_attempts" USING "btree" ("quiz_id");



CREATE INDEX "idx_quiz_attempts_user_id" ON "public"."quiz_attempts" USING "btree" ("user_id");



CREATE INDEX "idx_quiz_questions_quiz_id" ON "public"."quiz_questions" USING "btree" ("quiz_id");



CREATE INDEX "idx_visitors_device_type" ON "public"."visitors" USING "btree" ("device_type");



CREATE INDEX "idx_visitors_id_date" ON "public"."visitors" USING "btree" ("visitor_id", "visit_date");



CREATE INDEX "idx_visitors_page_url" ON "public"."visitors" USING "btree" ("page_url");



CREATE INDEX "idx_visitors_visit_date" ON "public"."visitors" USING "btree" ("visit_date");



CREATE UNIQUE INDEX "post_likes_anon_unique" ON "public"."post_likes" USING "btree" ("post_id", "anon_key") WHERE (("anon_key" IS NOT NULL) AND ("deleted_at" IS NULL));



CREATE UNIQUE INDEX "post_likes_user_unique" ON "public"."post_likes" USING "btree" ("post_id", "user_id") WHERE (("user_id" IS NOT NULL) AND ("deleted_at" IS NULL));



CREATE OR REPLACE TRIGGER "set_post_updated_at" BEFORE UPDATE ON "public"."posts" FOR EACH ROW EXECUTE FUNCTION "public"."update_post_updated_at"();



ALTER TABLE ONLY "public"."comments"
    ADD CONSTRAINT "comments_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."comments"
    ADD CONSTRAINT "comments_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "public"."comments"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."posts"
    ADD CONSTRAINT "fk_category" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."post_likes"
    ADD CONSTRAINT "fk_post_likes_user" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."points"
    ADD CONSTRAINT "points_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."profile"
    ADD CONSTRAINT "profile_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."quiz_answers"
    ADD CONSTRAINT "quiz_answers_attempt_id_fkey" FOREIGN KEY ("attempt_id") REFERENCES "public"."quiz_attempts"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."quiz_answers"
    ADD CONSTRAINT "quiz_answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "public"."quiz_questions"("id");



ALTER TABLE ONLY "public"."quiz_attempts"
    ADD CONSTRAINT "quiz_attempts_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "public"."quizzes"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."quiz_attempts"
    ADD CONSTRAINT "quiz_attempts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."quiz_questions"
    ADD CONSTRAINT "quiz_questions_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "public"."quizzes"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."quizzes"
    ADD CONSTRAINT "quizzes_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "auth"."users"("id");



ALTER TABLE "public"."categories" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."points" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."profile" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "모든 사용자에게 조회 허용" ON "public"."categories" FOR SELECT USING (true);



CREATE POLICY "본인만 삭제 가능" ON "public"."profile" FOR DELETE USING ((( SELECT "auth"."uid"() AS "uid") = "id"));



CREATE POLICY "본인만 생성 가능" ON "public"."profile" FOR INSERT WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "id"));



CREATE POLICY "본인만 수정 가능" ON "public"."profile" FOR UPDATE USING ((( SELECT "auth"."uid"() AS "uid") = "id"));



CREATE POLICY "본인만 조회 가능" ON "public"."profile" FOR SELECT USING ((( SELECT "auth"."uid"() AS "uid") = "id"));





ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";





GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";









































































































































































































GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";



GRANT ALL ON FUNCTION "public"."increment_view_count"("post_id" bigint) TO "anon";
GRANT ALL ON FUNCTION "public"."increment_view_count"("post_id" bigint) TO "authenticated";
GRANT ALL ON FUNCTION "public"."increment_view_count"("post_id" bigint) TO "service_role";



GRANT ALL ON PROCEDURE "public"."increment_visitor_count"(IN "p_visitor_id" "text") TO "anon";
GRANT ALL ON PROCEDURE "public"."increment_visitor_count"(IN "p_visitor_id" "text") TO "authenticated";
GRANT ALL ON PROCEDURE "public"."increment_visitor_count"(IN "p_visitor_id" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."increment_visitor_count"("session_id_param" character varying) TO "anon";
GRANT ALL ON FUNCTION "public"."increment_visitor_count"("session_id_param" character varying) TO "authenticated";
GRANT ALL ON FUNCTION "public"."increment_visitor_count"("session_id_param" character varying) TO "service_role";



GRANT ALL ON FUNCTION "public"."update_post_updated_at"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_post_updated_at"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_post_updated_at"() TO "service_role";



GRANT ALL ON FUNCTION "public"."update_stats"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_stats"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_stats"() TO "service_role";



GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "service_role";

































GRANT ALL ON TABLE "public"."categories" TO "anon";
GRANT ALL ON TABLE "public"."categories" TO "authenticated";
GRANT ALL ON TABLE "public"."categories" TO "service_role";



GRANT ALL ON TABLE "public"."comments" TO "anon";
GRANT ALL ON TABLE "public"."comments" TO "authenticated";
GRANT ALL ON TABLE "public"."comments" TO "service_role";



GRANT ALL ON SEQUENCE "public"."comments_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."comments_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."comments_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."daily_stats" TO "anon";
GRANT ALL ON TABLE "public"."daily_stats" TO "authenticated";
GRANT ALL ON TABLE "public"."daily_stats" TO "service_role";



GRANT ALL ON SEQUENCE "public"."daily_stats_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."daily_stats_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."daily_stats_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."daily_visitor_log" TO "anon";
GRANT ALL ON TABLE "public"."daily_visitor_log" TO "authenticated";
GRANT ALL ON TABLE "public"."daily_visitor_log" TO "service_role";



GRANT ALL ON TABLE "public"."points" TO "anon";
GRANT ALL ON TABLE "public"."points" TO "authenticated";
GRANT ALL ON TABLE "public"."points" TO "service_role";



GRANT ALL ON SEQUENCE "public"."points_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."points_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."points_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."post_likes" TO "anon";
GRANT ALL ON TABLE "public"."post_likes" TO "authenticated";
GRANT ALL ON TABLE "public"."post_likes" TO "service_role";



GRANT ALL ON TABLE "public"."posts" TO "anon";
GRANT ALL ON TABLE "public"."posts" TO "authenticated";
GRANT ALL ON TABLE "public"."posts" TO "service_role";



GRANT ALL ON SEQUENCE "public"."posts_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."posts_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."posts_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."profile" TO "anon";
GRANT ALL ON TABLE "public"."profile" TO "authenticated";
GRANT ALL ON TABLE "public"."profile" TO "service_role";



GRANT ALL ON TABLE "public"."quiz_answers" TO "anon";
GRANT ALL ON TABLE "public"."quiz_answers" TO "authenticated";
GRANT ALL ON TABLE "public"."quiz_answers" TO "service_role";



GRANT ALL ON SEQUENCE "public"."quiz_answers_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."quiz_answers_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."quiz_answers_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."quiz_attempts" TO "anon";
GRANT ALL ON TABLE "public"."quiz_attempts" TO "authenticated";
GRANT ALL ON TABLE "public"."quiz_attempts" TO "service_role";



GRANT ALL ON SEQUENCE "public"."quiz_attempts_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."quiz_attempts_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."quiz_attempts_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."quiz_questions" TO "anon";
GRANT ALL ON TABLE "public"."quiz_questions" TO "authenticated";
GRANT ALL ON TABLE "public"."quiz_questions" TO "service_role";



GRANT ALL ON SEQUENCE "public"."quiz_questions_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."quiz_questions_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."quiz_questions_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."quizzes" TO "anon";
GRANT ALL ON TABLE "public"."quizzes" TO "authenticated";
GRANT ALL ON TABLE "public"."quizzes" TO "service_role";



GRANT ALL ON SEQUENCE "public"."quizzes_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."quizzes_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."quizzes_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."visitors" TO "anon";
GRANT ALL ON TABLE "public"."visitors" TO "authenticated";
GRANT ALL ON TABLE "public"."visitors" TO "service_role";



GRANT ALL ON SEQUENCE "public"."visitors_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."visitors_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."visitors_id_seq" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
