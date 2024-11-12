import { toast } from "@/utils/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { INewStagePayload, IStage } from "./stage";
import { stageService } from "@/infra/stage/service";

type ResponseType = IStage;
type RequestType = Partial<INewStagePayload> & { id: string; };

export default function useUpdateStageMutation() {
  const queryClient = useQueryClient();
  
  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ id, ...json }) => {
      const data = await stageService.update(id, json);
      return data;
    },
    onSuccess: () => {
      toast.success("Successfully updated the stage!");
      queryClient.invalidateQueries({
        predicate: (query) => {
          return (query.queryKey?.[0] as string)?.startsWith("get-stages");
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