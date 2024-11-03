import { toast } from "@/utils/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { IApplication, INewApplicationPayload } from "../application/application";
import { applicationService } from "@/infra/application/service";

type ResponseType = IApplication;
type RequestType = INewApplicationPayload;

export default function useCreateApplicationMutation() {
  const queryClient = useQueryClient();
  
  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const data = await applicationService.create(json);
      return data;
    },
    onSuccess: () => {
      toast.success("Successfully applied!");
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