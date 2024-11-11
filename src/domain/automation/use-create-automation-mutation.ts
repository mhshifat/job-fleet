import { toast } from "@/utils/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { IAutomation, INewAutomationPayload } from "./automation";
import { automationService } from "@/infra/automation/service";

type ResponseType = IAutomation;
type RequestType = INewAutomationPayload;

export default function useCreateAutomationMutation() {
  const queryClient = useQueryClient();
  
  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const data = await automationService.create(json);
      return data;
    },
    onSuccess: () => {
      toast.success("Successfully created a new automation!");
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