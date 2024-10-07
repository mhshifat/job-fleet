import { toast } from "@/utils/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IRegisterPayload } from "./auth";
import { authService } from "@/infra/auth/service";
import { AxiosError } from "axios";

type ResponseType = string;
type RequestType = IRegisterPayload;

export default function useSignUpMutation() {
  const queryClient = useQueryClient();
  
  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const data = await authService.register(json);
      return data;
    },
    onSuccess: (data) => {
      toast.success(data || "Successfully logged in!");
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