import { toast } from "@/shared/hooks/use-toast";
import { SupabaseBrowserClient } from "@/shared/lib/supabase/supabase-browser-client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useResetPassword = (code: string) => {
  const router = useRouter();
  const supabase = SupabaseBrowserClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: any) => {
      const { error } = await supabase.auth.exchangeCodeForSession(code!);
      if (error) {
        throw error;
      }
      const { error: updateError } = await supabase.auth.updateUser({
        password: data.password,
      });
      if (updateError) {
        throw updateError;
      }
      return { success: true };
    },
    onSuccess: () => {
      router.push("/login");
    },
    onError: (error) => {
      toast({
        title: "비밀번호 재설정에 실패했습니다.",
        description: error.message,
      });
    },
  });

  return { mutate, isPending };
};

export default useResetPassword;
