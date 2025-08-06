import { toast } from "@/shared/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { MatchingResult } from "../types";

interface SearchRequest {
  category: string;
  question: string;
}

interface SearchResponse {
  results: MatchingResult[];
}

async function searchPhilosophers(
  data: SearchRequest,
): Promise<SearchResponse> {
  console.log("🔍 API 요청 시작:", data);

  const response = await fetch("/api/ai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    const errorMessage = result?.error || "답변 생성에 실패했습니다.";
    throw new Error(errorMessage);
  }

  return result;
}

export function usePhilosopherSearch() {
  const mutation = useMutation({
    mutationFn: searchPhilosophers,
    onError: (error) => {
      toast({
        title: "오류가 발생했습니다.",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  const form = useForm({
    defaultValues: {
      category: "",
      question: "",
    },
  });

  const results = mutation.data?.results || [];

  const onSubmit = (data: { category: string; question: string }) => {
    mutation.mutate(data);
  };

  return {
    onSubmit,
    form,
    results: results,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
}
