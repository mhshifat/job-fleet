import { toast } from "@/utils/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { IForm, INewFormPayload } from "./form";
import { formService } from "@/infra/form/service";

type ResponseType = IForm;
type RequestType = Partial<INewFormPayload> & { id: string };

export default function useUpdateFormMutation() {
  const queryClient = useQueryClient();
  
  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ id, ...json }) => {
      const data = await formService.update(id, json);
      return data;
    },
    onSuccess: () => {
      toast.success("Successfully updated the form!");
      queryClient.invalidateQueries({ queryKey: ["get-my-forms"] });
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