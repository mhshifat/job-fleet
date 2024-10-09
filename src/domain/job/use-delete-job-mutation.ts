import { toast } from "@/utils/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IJob } from "./job";
import { jobService } from "@/infra/job/service";
import { AxiosError } from "axios";

type ResponseType = IJob;
type RequestType = unknown;

export default function useDeleteJobMutation(id: string) {
  const queryClient = useQueryClient();
  
  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async () => {
      const data = await jobService.deleteById(id);
      return data;
    },
    onSuccess: () => {
      toast.success("Successfully deleted the job!");
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