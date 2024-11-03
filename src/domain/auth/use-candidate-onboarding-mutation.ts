import { toast } from "@/utils/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ICandidateOnboardingPayload, ILoginResponse } from "./auth";
import { authService } from "@/infra/auth/service";
import { AxiosError } from "axios";

type ResponseType = ILoginResponse;
type RequestType = ICandidateOnboardingPayload;

export default function useCandidateOnboardingMutation() {
  const queryClient = useQueryClient();
  
  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const data = await authService.candidateOnboarding(json);
      return data;
    },
    onSuccess: () => {
      toast.success("Successfully logged in!");
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