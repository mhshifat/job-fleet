import { toast } from "@/utils/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IJob, INewJobPayload } from "./job";
import { jobService } from "@/infra/job/service";
import { AxiosError } from "axios";

type ResponseType = IJob;
type RequestType = Partial<INewJobPayload> & { id: string };

export default function useUpdateJobMutation() {
  const queryClient = useQueryClient();
  
  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ id, ...json }) => {
      const data = await jobService.update(id, json);
      return data;
    },
    onSuccess: () => {
      toast.success("Successfully updated the job!");
      queryClient.invalidateQueries({ queryKey: ["get-my-jobs"] });
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