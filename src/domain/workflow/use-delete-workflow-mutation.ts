import { toast } from "@/utils/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { IWorkflow } from "./workflow";
import { workflowService } from "@/infra/workflow/service";

type ResponseType = IWorkflow;
type RequestType = unknown;

export default function useDeleteWorkflowMutation(id: string) {
  const queryClient = useQueryClient();
  
  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async () => {
      const data = await workflowService.deleteById(id);
      return data;
    },
    onSuccess: () => {
      toast.success("Successfully deleted the workflow!");
      queryClient.invalidateQueries({
        predicate: (query) => {
          return (query.queryKey?.[0] as string)?.startsWith("get-workflows");
        }
      });
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