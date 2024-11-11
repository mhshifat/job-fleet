import { toast } from "@/utils/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { IAutomation } from "./automation";
import { automationService } from "@/infra/automation/service";

type ResponseType = IAutomation;
type RequestType = unknown;

export default function useDeleteAutomationMutation(id: string) {
  const queryClient = useQueryClient();
  
  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async () => {
      const data = await automationService.deleteById(id);
      return data;
    },
    onSuccess: () => {
      toast.success("Successfully deleted the automation!");
      queryClient.invalidateQueries({
        predicate: (query) => {
          return (query.queryKey?.[0] as string)?.startsWith("get-automations");
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