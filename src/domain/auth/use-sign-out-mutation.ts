import { toast } from "@/utils/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/infra/auth/service";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { ROUTE_PATHS } from "@/utils/constants";
import { useAuth } from "@/components/providers/auth";

type ResponseType = string;

export default function useSignOutMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { updateAuthState } = useAuth();
  
  return useMutation<ResponseType, Error>({
    mutationFn: async () => {
      queryClient.clear();
      const data = await authService.logout();
      return data || "";
    },
    onSuccess: async (data) => {
      updateAuthState(null);
      toast.success(data || "Successfully signed out!");
      router.push(ROUTE_PATHS.HOME);
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        toast.error(err?.response?.data?.message || "Something went wrong!");
      } else {
        toast.error(err?.message || "Something went wrong!");
      }
    },
  })
}