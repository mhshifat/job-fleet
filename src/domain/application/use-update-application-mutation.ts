import { toast } from "@/utils/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { IApplication, INewApplicationPayload } from "./application";
import { applicationService } from "@/infra/application/service";

type ResponseType = IApplication;
type RequestType = Partial<INewApplicationPayload> & { id: string; };

export default function useUpdateApplicationMutation() {
  const queryClient = useQueryClient();
  
  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ id, ...json }) => {
      const data = await applicationService.update(id, json);
      return data;
    },
    onSuccess: () => {
      toast.success("Successfully updated the application!");
      queryClient.invalidateQueries({
        predicate: (query) => {
          return (query.queryKey?.[0] as string)?.startsWith("get-applications");
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