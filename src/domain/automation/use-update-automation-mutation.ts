import { toast } from "@/utils/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { IAutomation, INewAutomationPayload } from "./automation";
import { automationService } from "@/infra/automation/service";

type ResponseType = IAutomation;
type RequestType = Partial<INewAutomationPayload> & { id: string; allowPublicRecords?: boolean };

export default function useUpdateAutomationMutation() {
  const queryClient = useQueryClient();
  
  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ id, ...json }) => {
      const data = await automationService.update(id, json);
      return data;
    },
    onSuccess: () => {
      toast.success("Successfully updated the form!");
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