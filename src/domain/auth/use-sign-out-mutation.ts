import { toast } from "@/utils/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/infra/auth/service";
import { AxiosError } from "axios";

type ResponseType = string;

export default function useSignOutMutation() {
  const queryClient = useQueryClient();
  
  return useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const data = await authService.logout();
      return data || "";
    },
    onSuccess: (data) => {
      toast.success(data || "Successfully signed out!");
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