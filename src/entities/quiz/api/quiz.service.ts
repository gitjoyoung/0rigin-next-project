import { SupabaseServerClient } from "@/shared/lib/supabase/supabase-server-client";
import {
  CreateQuizQuestionRequest,
  CreateQuizRequest,
  Quiz,
  QuizDetail,
  QuizOption,
  QuizQuestion,
  QuizQuestionWithOptions,
} from "../types";

// 퀴즈 목록 조회
export async function getQuizzes(limit = 10, offset = 0): Promise<Quiz[]> {
  const supabase = await SupabaseServerClient();

  const { data, error } = await supabase
    .from("quizzes")
    .select("*")
    .eq("is_public", true)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;
  return data || [];
}

// 문제의 옵션들을 배열로 변환하는 헬퍼 함수
function createOptionsArray(question: QuizQuestion): QuizOption[] {
  const options: QuizOption[] = [];

  // option_1부터 option_5까지 동적으로 순회
  for (let i = 1; i <= question.option_count; i++) {
    const optionKey = `option_${i}` as keyof QuizQuestion;
    const optionText = question[optionKey];

    if (
      optionText &&
      typeof optionText === "string" &&
      optionText.trim() !== ""
    ) {
      options.push({ id: String(i), text: optionText });
    }
  }

  return options;
}

// 퀴즈 상세 조회 (문제 포함)
export async function getQuizById(id: number): Promise<QuizDetail | null> {
  const supabase = await SupabaseServerClient();

  // 퀴즈 기본 정보 조회
  const { data: quiz, error: quizError } = await supabase
    .from("quizzes")
    .select("*")
    .eq("id", id)
    .eq("is_public", true)
    .single();

  if (quizError) throw quizError;
  if (!quiz) return null;

  // 퀴즈 문제들 조회
  const { data: questions, error: questionsError } = await supabase
    .from("quiz_questions")
    .select("*")
    .eq("quiz_id", quiz.id)
    .order("question_number", { ascending: true });

  if (questionsError) throw questionsError;

  const quizQuestions = (questions || []) as QuizQuestion[];

  // 각 문제에 옵션 배열 추가
  const questionsWithOptions: QuizQuestionWithOptions[] = quizQuestions.map(
    (question) => ({
      ...question,
      options: createOptionsArray(question),
    }),
  );

  return {
    ...quiz,
    questions: questionsWithOptions,
    total_questions: questionsWithOptions.length,
  };
}

// 퀴즈 문제 목록 조회
export async function getQuizQuestions(
  quizId: number,
): Promise<QuizQuestion[]> {
  const supabase = await SupabaseServerClient();

  const { data, error } = await supabase
    .from("quiz_questions")
    .select("*")
    .eq("quiz_id", quizId)
    .order("question_number", { ascending: true });

  if (error) throw error;
  return data || [];
}

// 퀴즈 검색
export async function searchQuizzes(
  keyword: string,
  limit = 5,
  offset = 0,
): Promise<{ data: Quiz[]; count: number }> {
  const supabase = await SupabaseServerClient();

  // 전체 개수 조회
  const { count } = await supabase
    .from("quizzes")
    .select("*", { count: "exact", head: true })
    .eq("is_public", true)
    .or(`title.ilike.%${keyword}%,description.ilike.%${keyword}%`);

  // 검색 결과 조회
  const { data, error } = await supabase
    .from("quizzes")
    .select("*")
    .eq("is_public", true)
    .or(`title.ilike.%${keyword}%,description.ilike.%${keyword}%`)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;

  return {
    data: data || [],
    count: count || 0,
  };
}

// 퀴즈 생성
export async function createQuiz(
  quizData: CreateQuizRequest,
  authorId: string,
): Promise<Quiz> {
  const supabase = await SupabaseServerClient();

  const { data, error } = await supabase
    .from("quizzes")
    .insert({
      ...quizData,
      author_id: authorId,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// 퀴즈 문제 생성
export async function createQuizQuestion(
  questionData: CreateQuizQuestionRequest,
): Promise<QuizQuestion> {
  const supabase = await SupabaseServerClient();

  const { data, error } = await supabase
    .from("quiz_questions")
    .insert(questionData)
    .select()
    .single();

  if (error) throw error;
  return data;
}
