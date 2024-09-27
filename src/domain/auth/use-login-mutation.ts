import { toast } from "@/utils/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ILoginPayload, ILoginResponse } from "./auth";
import { authService } from "@/infra/auth/service";

type ResponseType = ILoginResponse;
type RequestType = ILoginPayload;

export default function useLoginMutation() {
  const queryClient = useQueryClient();
  
  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const data = await authService.login(json);
      return data;
    },
    onSuccess: () => {
      toast.success("Successfully logged in!");
    },
    onError: () => {
      toast.error("Invalid credentials!");
    },
  })
}