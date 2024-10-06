import { toast } from "@/utils/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IJob, INewJobPayload } from "./job";
import { jobService } from "@/infra/job/service";

type ResponseType = IJob;
type RequestType = INewJobPayload;

export default function useUpdateJobMutation() {
  const queryClient = useQueryClient();
  
  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const data = await jobService.update(json);
      return data;
    },
    onSuccess: () => {
      toast.success("Successfully updated the job!");
    },
    onError: () => {
      toast.error("Invalid credentials!");
    },
  })
}