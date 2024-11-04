import { toast } from "@/utils/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { formService } from "@/infra/form/service";
import { IForm } from "./form";

type ResponseType = IForm;
type RequestType = unknown;

export default function useDeleteFormMutation(id: string) {
  const queryClient = useQueryClient();
  
  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async () => {
      const data = await formService.deleteById(id);
      return data;
    },
    onSuccess: () => {
      toast.success("Successfully deleted the form!");
      queryClient.invalidateQueries({
        predicate: (query) => {
          return (query.queryKey?.[0] as string)?.startsWith("get-my-forms");
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