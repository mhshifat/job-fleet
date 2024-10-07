import { toast } from "@/utils/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IJob, INewJobPayload } from "./job";
import { jobService } from "@/infra/job/service";
import { AxiosError } from "axios";

type ResponseType = IJob;
type RequestType = INewJobPayload;

export default function useCreateJobMutation() {
  const queryClient = useQueryClient();
  
  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const data = await jobService.create(json);
      return data;
    },
    onSuccess: () => {
      toast.success("Successfully created a new job!");
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