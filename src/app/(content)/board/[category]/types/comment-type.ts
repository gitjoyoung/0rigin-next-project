export interface IComment {
   id: number
   post_id: number
   parent_id: number
   created_at: string
   updated_at: string
   content: string
   author_id: string
   nickname: string
   password: string
   likes: number
   is_approved: boolean
   is_edited: boolean
   depth: number
   is_guest: boolean
}

/**
 * SQL 테이블 스키마 참조
 *
 * id BIGSERIAL PRIMARY KEY,                             -- 댓글 고유 식별자, 자동 증가
 * post_id BIGINT NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE, -- 연결된 게시글 ID
 * parent_id BIGINT REFERENCES public.comments(id) ON DELETE CASCADE, -- 상위 댓글 ID (대댓글인 경우)
 * created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), -- 댓글 생성 시간
 * updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),     -- 댓글 수정 시간
 * content TEXT NOT NULL,                                -- 댓글 내용
 * author_id UUID REFERENCES auth.users(id),             -- 회원 작성자 ID (외래 키)
 * nickname TEXT NOT NULL,                               -- 작성자 닉네임 (회원/비회원 모두)
 * password TEXT,                                        -- 비회원 댓글 수정/삭제용 비밀번호
 * is_guest BOOLEAN NOT NULL DEFAULT false,              -- 비회원 여부 (true: 비회원, false: 회원)
 * likes INTEGER NOT NULL DEFAULT 0,                     -- 댓글 좋아요 수
 * is_approved BOOLEAN NOT NULL DEFAULT true,            -- 댓글 승인 상태 (관리자 승인 필요 시)
 * is_edited BOOLEAN NOT NULL DEFAULT false,             -- 수정 여부 표시
 * depth INTEGER NOT NULL DEFAULT 0,                     -- 댓글 깊이 (0: 일반 댓글, 1: 대댓글, ...)
 */
