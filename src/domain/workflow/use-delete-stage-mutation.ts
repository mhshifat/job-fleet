import { toast } from "@/utils/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { IStage } from "../stage/stage";
import { stageService } from "@/infra/stage/service";

type ResponseType = IStage;
type RequestType = unknown;

export default function useDeleteStageMutation(id: string) {
  const queryClient = useQueryClient();
  
  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async () => {
      const data = await stageService.deleteById(id);
      return data;
    },
    onSuccess: () => {
      toast.success("Successfully deleted the stage!");
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